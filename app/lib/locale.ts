export const SITE_LOCALES = ['en', 'ro', 'hu'] as const

export type SiteLocale = (typeof SITE_LOCALES)[number]

export const DEFAULT_SITE_LOCALE: SiteLocale = 'en'

export function isSiteLocale(value: string): value is SiteLocale {
  return SITE_LOCALES.includes(value as SiteLocale)
}

export function localizeHref(locale: SiteLocale, href: string) {
  if (
    !href ||
    href.startsWith('#') ||
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return href
  }

  const [path, hash] = href.split('#')
  const normalizedPath = path === '/' ? '' : path
  const withLocale = `/${locale}${normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`}`

  return hash ? `${withLocale}#${hash}` : withLocale
}

export function switchLocaleInPathname(pathname: string, locale: SiteLocale) {
  const segments = pathname.split('/')

  if (isSiteLocale(segments[1] ?? '')) {
    segments[1] = locale
    return segments.join('/') || `/${locale}`
  }

  return pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
}
