export const SUPPORTED_LANGUAGES = [
  {id: 'en', title: 'English'},
  {id: 'ro', title: 'Romanian'},
  {id: 'hu', title: 'Hungarian'},
] as const

export const DEFAULT_LANGUAGE = 'en'

export type SiteLanguage = (typeof SUPPORTED_LANGUAGES)[number]['id']

export function isSiteLanguage(value: string): value is SiteLanguage {
  return SUPPORTED_LANGUAGES.some((language) => language.id === value)
}
