'use client'

import {useState} from 'react'
import type {DocumentActionComponent} from 'sanity'
import {useClient} from 'sanity'

import {apiVersion} from '../env'

const ENGLISH_LANGUAGE = 'en'

type TranslationMetadataResult = {
  translations?: Array<{
    _ref?: string
    valueRef?: string
    value?: {
      _id: string
      _type: string
      language?: string
    } | null
    legacyDoc?: {
      _id: string
      _type: string
      language?: string
    } | null
  } | null>
} | null

function normalizeDocumentId(id: string): string {
  return id.replace(/^drafts\./, '')
}

function createDraftId(id: string): string {
  return `drafts.${normalizeDocumentId(id)}`
}

function isStructuralStringKey(key: string | undefined): boolean {
  if (!key) {
    return false
  }

  return key.startsWith('_') || key === 'assetId'
}

function mergeNonTextValue(sourceValue: unknown, targetValue: unknown, key?: string): unknown {
  if (sourceValue === undefined) {
    return targetValue
  }

  if (Array.isArray(sourceValue)) {
    const sourceItems = sourceValue
    const targetItems = Array.isArray(targetValue) ? targetValue : []
    const mergedItems = sourceItems
      .map((item, index) => mergeNonTextValue(item, targetItems[index]))
      .filter((item) => item !== undefined)

    if (mergedItems.length === 0) {
      return targetItems.length > 0 ? targetItems : undefined
    }

    return mergedItems
  }

  if (sourceValue && typeof sourceValue === 'object') {
    const typedSourceValue = sourceValue as {_type?: string}
    const targetObject =
      targetValue && typeof targetValue === 'object' && !Array.isArray(targetValue)
        ? (targetValue as Record<string, unknown>)
        : {}

    if (typedSourceValue._type === 'slug') {
      return targetValue
    }

    // Portable text blocks are textual, so skip these entries entirely.
    if (typedSourceValue._type === 'block') {
      return targetValue
    }

    const sourceObject = sourceValue as Record<string, unknown>
    const objectKeys = new Set([...Object.keys(targetObject), ...Object.keys(sourceObject)])
    const mergedEntries: Array<[string, unknown]> = []

    for (const objectKey of objectKeys) {
      const mergedEntryValue = mergeNonTextValue(sourceObject[objectKey], targetObject[objectKey], objectKey)

      if (mergedEntryValue !== undefined) {
        mergedEntries.push([objectKey, mergedEntryValue])
      }
    }

    if (mergedEntries.length === 0) {
      return undefined
    }

    const mergedObject = Object.fromEntries(mergedEntries)
    const mergedObjectKeys = Object.keys(mergedObject)
    const hasNonMetaContent = mergedObjectKeys.some((entryKey) => !entryKey.startsWith('_'))
    const hasReferencePayload = mergedObjectKeys.includes('_ref')

    if (!hasNonMetaContent && !hasReferencePayload) {
      return targetValue
    }

    return mergedObject
  }

  if (typeof sourceValue === 'string') {
    if (isStructuralStringKey(key)) {
      return sourceValue
    }

    return targetValue
  }

  return sourceValue
}

function buildMergedPayload(
  sourceDocument: Record<string, unknown>,
  targetDocument: Record<string, unknown>
): Record<string, unknown> {
  const mergedEntries = Object.entries(sourceDocument)
    .filter(([key]) => key !== 'language' && !key.startsWith('_'))
    .map(([key, sourceValue]) => [key, mergeNonTextValue(sourceValue, targetDocument[key], key)] as const)
    .filter(([, value]) => value !== undefined)

  return Object.fromEntries(mergedEntries)
}

const translationMetadataQuery = `
*[_type == "translation.metadata" && (references($publishedDocId) || references($draftDocId))][0]{
  translations[]{
    _ref,
    "valueRef": value._ref,
    value->{
      _id,
      _type,
      language
    },
    "legacyDoc": @->{
      _id,
      _type,
      language
    }
  }
}
`

const targetDocumentQuery = `
*[_id in [$draftId, $publishedId]][0]
`

export const CopyEnglishToTranslationsAction: DocumentActionComponent = (props) => {
  const {id, type, draft, published, onComplete} = props
  const client = useClient({apiVersion})

  const [isRunning, setIsRunning] = useState(false)
  const [resultMessage, setResultMessage] = useState<string | null>(null)
  const sourceDocument = (draft ?? published ?? null) as Record<string, unknown> | null
  const sourceLanguage = typeof sourceDocument?.language === 'string' ? sourceDocument.language : null

  const isEnglishDocument = sourceLanguage === ENGLISH_LANGUAGE
  const isDisabled = isRunning || !sourceDocument || !isEnglishDocument

  return {
    label: isRunning ? 'Copying non-text content…' : 'Copy EN non-text content',
    title:
      resultMessage ??
      (isEnglishDocument
        ? 'Copy only non-textual values from English and choose where to paste.'
        : 'Open the English version of this document to copy content to HU/RO.'),
    disabled: isDisabled,
    onHandle: async () => {
      if (!sourceDocument || !isEnglishDocument || isRunning) {
        onComplete()
        return
      }

      setIsRunning(true)
      setResultMessage(null)

      try {
        const sourcePublishedId = normalizeDocumentId(id)
        const sourceDraftId = createDraftId(sourcePublishedId)
        const metadata = await client.fetch<TranslationMetadataResult>(translationMetadataQuery, {
          publishedDocId: sourcePublishedId,
          draftDocId: sourceDraftId,
        })

        const translationTargets = (metadata?.translations ?? [])
          .map((entry) => entry?.value ?? entry?.legacyDoc ?? null)
          .filter((value): value is {_id: string; _type: string; language?: string} => Boolean(value))
          .filter((value) => normalizeDocumentId(value._id) !== sourcePublishedId)
          .filter((value) => value._type === type)
          .filter((value) => typeof value.language === 'string')

        if (translationTargets.length === 0) {
          setResultMessage('No linked translations found for this document.')
          window.alert(
            'No linked translations found for this document. This usually means the translation metadata is missing or not linked.'
          )
          return
        }

        const availableLanguages = Array.from(
          new Set(
            translationTargets
              .map((target) => target.language)
              .filter((language): language is string => typeof language === 'string')
          )
        )

        const languageInput = window.prompt(
          `Choose target language(s) to receive non-text content.\nAvailable: ${availableLanguages.join(
            ', '
          )}\n\nEnter comma-separated codes (example: hu,ro):`,
          availableLanguages.join(',')
        )

        if (languageInput === null) {
          setResultMessage('Copy cancelled.')
          return
        }

        const selectedLanguages = new Set(
          languageInput
            .split(',')
            .map((value) => value.trim().toLowerCase())
            .filter((value) => value.length > 0)
        )

        if (selectedLanguages.size === 0) {
          setResultMessage('No target languages selected.')
          window.alert('No target languages selected.')
          return
        }

        const selectedTargets = translationTargets.filter(
          (target) => typeof target.language === 'string' && selectedLanguages.has(target.language)
        )

        if (selectedTargets.length === 0) {
          setResultMessage('No linked translation matches the selected language(s).')
          window.alert('No linked translation matches the selected language selection.')
          return
        }

        const transaction = client.transaction()

        for (const target of selectedTargets) {
          const targetPublishedId = normalizeDocumentId(target._id)
          const targetDraftId = createDraftId(targetPublishedId)
          const targetDocument = (await client.fetch<Record<string, unknown> | null>(targetDocumentQuery, {
            draftId: targetDraftId,
            publishedId: targetPublishedId,
          })) ?? {
            _id: targetDraftId,
            _type: target._type,
            language: target.language,
          }
          const mergedPayload = buildMergedPayload(sourceDocument, targetDocument)

          transaction.createIfNotExists({
            _id: targetDraftId,
            _type: target._type,
            language: target.language,
          })

          transaction.patch(targetDraftId, {
            set: {
              ...mergedPayload,
              language: target.language,
            },
          })
        }

        await transaction.commit({autoGenerateArrayKeys: true})
        setResultMessage(`Copied non-text content to ${selectedTargets.length} translation draft(s).`)
        window.alert(`Copied non-text content to ${selectedTargets.length} translation draft(s).`)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        setResultMessage(`Copy failed: ${message}`)
        window.alert(`Copy failed: ${message}`)
      } finally {
        setIsRunning(false)
        onComplete()
      }
    },
  }
}
