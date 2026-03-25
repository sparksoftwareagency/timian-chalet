import {defineField} from 'sanity'

import {apiVersion} from '../env'
import {SUPPORTED_LANGUAGES} from '../lib/languages'

export const localizedSchemaTypes = [
  'siteSettings',
  'navigation',
  'homePage',
  'aboutPage',
  'restaurantPage',
  'culinaryPage',
  'experiencesPage',
  'wellnessPage',
  'localCheesePage',
  'roomsPage',
  'room',
] as const

export const languageField = defineField({
  name: 'language',
  title: 'Language',
  type: 'string',
  readOnly: true,
  hidden: true,
  options: {
    list: SUPPORTED_LANGUAGES.map((language) => ({
      title: language.title,
      value: language.id,
    })),
  },
})

export const seoFields = [
  defineField({
    name: 'seoTitle',
    title: 'SEO title',
    type: 'string',
  }),
  defineField({
    name: 'seoDescription',
    title: 'SEO description',
    type: 'text',
    rows: 3,
  }),
] as const

export async function isUniquePerLanguage(
  slug: string | undefined,
  context: {
    document?: {_id?: string; _type?: string; language?: string}
    getClient: (options: {apiVersion: string}) => {
      fetch: <T>(query: string, params: Record<string, unknown>) => Promise<T>
    }
  }
) {
  const {document, getClient} = context

  if (!slug || !document?._type || !document.language) {
    return true
  }

  const client = getClient({apiVersion})
  const baseId = document._id?.replace(/^drafts\./, '')

  const params = {
    draft: baseId ? `drafts.${baseId}` : '',
    published: baseId ?? '',
    slug,
    language: document.language,
    type: document._type,
  }

  const query = `!defined(*[
    _type == $type &&
    slug.current == $slug &&
    language == $language &&
    !(_id in [$draft, $published])
  ][0]._id)`

  return client.fetch<boolean>(query, params)
}
