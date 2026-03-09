'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...tool]]/page.tsx` route
 */

import {
  DeleteTranslationAction,
  DuplicateWithTranslationsAction,
  documentInternationalization,
} from '@sanity/document-internationalization'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {SUPPORTED_LANGUAGES} from './sanity/lib/languages'
import {schema} from './sanity/schemaTypes'
import {localizedSchemaTypes} from './sanity/schemaTypes/shared'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
    documentInternationalization({
      supportedLanguages: SUPPORTED_LANGUAGES.map((language) => ({
        id: language.id,
        title: language.title,
      })),
      schemaTypes: [...localizedSchemaTypes],
      languageField: 'language',
      weakReferences: true,
      allowCreateMetaDoc: true,
      apiVersion,
    }),
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    actions: (prev, context) => {
      if (localizedSchemaTypes.includes(context.schemaType as (typeof localizedSchemaTypes)[number])) {
        return [...prev, DeleteTranslationAction, DuplicateWithTranslationsAction]
      }

      return prev
    },
  },
})
