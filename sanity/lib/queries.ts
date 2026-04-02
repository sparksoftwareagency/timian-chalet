import {groq} from 'next-sanity'

import {client} from './client'
import {DEFAULT_LANGUAGE, type SiteLanguage} from './languages'

const SANITY_TAGS = {
  all: 'sanity',
  siteSettings: 'sanity:siteSettings',
  navigation: 'sanity:navigation',
  homePage: 'sanity:homePage',
  aboutPage: 'sanity:aboutPage',
  restaurantPage: 'sanity:restaurantPage',
  culinaryPage: 'sanity:culinaryPage',
  experiencesPage: 'sanity:experiencesPage',
  wellnessPage: 'sanity:wellnessPage',
  localCheesePage: 'sanity:localCheesePage',
  roomsPage: 'sanity:roomsPage',
  room: 'sanity:room',
} as const

function roomSlugTag(slug: string) {
  return `${SANITY_TAGS.room}:${slug}`
}

export type CmsImage = {
  alt: string
  url: string
}

export type CmsLink = {
  label: string
  href: string
  openInNewTab?: boolean
}

export type CmsStat = {
  value: string
  label: string
}

export type CmsTeaserSection = {
  eyebrow: string
  title: string
  description: string
  link: CmsLink
  image: CmsImage
}

export type CmsHomeExperienceCard = {
  _key: string
  title: string
  description: string
  link: CmsLink
  image: CmsImage
}

export type CmsHomeExperiencesBand = {
  eyebrow: string
  title: string
  description: string
  cards: CmsHomeExperienceCard[]
}

export type SiteSettingsData = {
  siteTitle: string
  siteDescription: string
  seoTitle?: string
  seoDescription?: string
  logoDarkUrl: string
  logoLightUrl: string
  loadingBrand: string
  loadingText: string
  bookNowLink: string
  footerDescription: string
  quickLinksHeading: string
  quickLinks: CmsLink[]
  servicesHeading: string
  services: string[]
  contactHeading: string
  addressLines: string[]
  phone: string
  email: string
  socialLinks: CmsLink[]
  copyright: string
  legalLinks: CmsLink[]
}

export type NavigationData = {
  languageSwitcherLabelEnglish: string
  languageSwitcherLabelRomanian: string
  languageSwitcherLabelHungarian: string
  bookNowLabel: string
  utilityLinks: CmsLink[]
  menuGroups: Array<{
    headline: string
    links: CmsLink[]
  }>
  roomsGroupTitle: string
}

export type HomePageData = {
  seoTitle?: string
  seoDescription?: string
  heroTitle: string
  heroSubtitle: string
  heroVideoUrl: string
  heroSecondaryImage: CmsImage
  heroCraftedLine: string
  heroRootedLine: string
  heroInNatureLine: string
  welcomeTitle: string
  welcomeParagraphs: string[]
  welcomeImage: CmsImage
  stats: CmsStat[]
  hotelSection: CmsTeaserSection
  roomsDividerImage: CmsImage
  roomsSection: CmsTeaserSection
  culinaryDividerImage: CmsImage
  culinarySection: CmsTeaserSection
  experiencesDividerImage: CmsImage
  experiencesBand: CmsHomeExperiencesBand
}

export type AboutPageData = {
  seoTitle?: string
  seoDescription?: string
  heroTitle: string
  heroSubtitle: string
  heroImage: CmsImage
  originEyebrow: string
  originTitle: string
  originParagraphs: string[]
  originPrimaryImage: CmsImage
  originSecondaryImage: CmsImage
  animalsBreakImage: CmsImage
  transformEyebrow: string
  transformTitle: string
  transformParagraphs: string[]
  transformImage: CmsImage
  quote: string
  farmEyebrow: string
  farmTitle: string
  farmParagraphs: string[]
  farmImages: CmsImage[]
  roomsEyebrow: string
  roomsTitle: string
  roomsIntro: string
  roomsImage: CmsImage
  roomFloors: Array<{title: string; description: string}>
  roomsLink: CmsLink
}

export type CulinaryPageData = {
  seoTitle?: string
  seoDescription?: string
  heroTitle: string
  heroSubtitle: string
  heroImage: CmsImage
}

export type RestaurantPageData = {
  seoTitle?: string
  seoDescription?: string
  heroTitle: string
  heroSubtitle: string
  heroImage: CmsImage
  originEyebrow: string
  originTitle: string
  originParagraphs: string[]
  originPrimaryImage: CmsImage
  ingredientsBreakImage: CmsImage
  spiritsEyebrow: string
  spiritsTitle: string
  spiritsParagraphs: string[]
  spiritsImage: CmsImage
  quote: string
  farmEyebrow: string
  farmTitle: string
  farmParagraphs: string[]
  farmImages: CmsImage[]
  atmosphereImage: CmsImage
  atmosphereEyebrow: string
  atmosphereTitle: string
  atmosphereIntro: string
  highlights: Array<{title: string; description: string}>
}

export type ExperiencesPageData = {
  language: string
  seoTitle?: string
  seoDescription?: string
  heroTitle: string
  heroSubtitle: string
  heroImage: CmsImage
  experienceVideoUrl?: string
  introEyebrow: string
  introTitle: string
  introParagraphs: string[]
  activitiesEyebrow: string
  activitiesTitle: string
  activities: Array<{
    _key: string
    title: string
    description: string
    image: CmsImage
  }>
  closingQuote: string
}

export type RoomsPageData = {
  seoTitle?: string
  seoDescription?: string
  heroTitle: string
  heroSubtitle: string
  heroImage: CmsImage
  roomLabel: string
  backToRoomsLabel: string
  bookThisRoomLabel: string
  galleryTitle: string
  discoverSpaceLabel: string
}

export type WellnessPageData = {
  seoTitle?: string
  seoDescription?: string
  heroTitle: string
  heroSubtitle: string
  heroImage: CmsImage
  introEyebrow: string
  introTitle: string
  introParagraphs: string[]
  introImage: CmsImage
  breakImage: CmsImage
  highlightEyebrow: string
  highlightTitle: string
  highlightParagraphs: string[]
  highlightImage: CmsImage
  quote: string
  featuresEyebrow: string
  featuresTitle: string
  features: Array<{
    _key: string
    title: string
    description: string
    image: CmsImage
  }>
}

export type LocalCheesePageData = {
  seoTitle?: string
  seoDescription?: string
  heroTitle: string
  heroSubtitle: string
  heroImage: CmsImage
  legacyEyebrow: string
  legacyTitle: string
  legacyParagraphs: string[]
  legacyImage: CmsImage
  cellarBreakImage: CmsImage
  signatureEyebrow: string
  signatureTitle: string
  signatureParagraphs: string[]
  signatureImage: CmsImage
  quote: string
  collectionEyebrow: string
  collectionTitle: string
  collections: Array<{
    _key: string
    title: string
    milk: string
    experience: string
    variations: string
    pairing: string
    image: CmsImage
  }>
  seasonalityEyebrow: string
  seasonalityTitle: string
  seasonalityIntro: string
  seasonalityNotes: string[]
}

export type RoomCardData = {
  title: string
  slug: string
  order: number
  tagline: string
  heroImage: CmsImage
}

export type RoomPageData = {
  title: string
  slug: string
  order: number
  seoTitle?: string
  seoDescription?: string
  tagline: string
  description: string
  galleryImages: CmsImage[]
}

const linkProjection = groq`{
  label,
  href,
  openInNewTab
}`

const imageProjection = groq`{
  alt,
  "url": image.asset->url
}`

const teaserProjection = groq`{
  eyebrow,
  title,
  description,
  link ${linkProjection},
  image ${imageProjection}
}`

const homeExperiencesBandProjection = groq`{
  eyebrow,
  title,
  description,
  cards[]{
    _key,
    title,
    description,
    link ${linkProjection},
    image ${imageProjection}
  }
}`

const siteSettingsQuery = groq`*[_type == "siteSettings" && language == $language][0]{
  siteTitle,
  siteDescription,
  seoTitle,
  seoDescription,
  "logoDarkUrl": logoDark.asset->url,
  "logoLightUrl": logoLight.asset->url,
  loadingBrand,
  loadingText,
  bookNowLink,
  footerDescription,
  quickLinksHeading,
  quickLinks[] ${linkProjection},
  servicesHeading,
  services[],
  contactHeading,
  addressLines[],
  phone,
  email,
  socialLinks[] ${linkProjection},
  copyright,
  legalLinks[] ${linkProjection}
}`

const navigationQuery = groq`*[_type == "navigation" && language == $language][0]{
  languageSwitcherLabelEnglish,
  languageSwitcherLabelRomanian,
  languageSwitcherLabelHungarian,
  bookNowLabel,
  utilityLinks[] ${linkProjection},
  menuGroups[]{
    headline,
    links[] ${linkProjection}
  },
  roomsGroupTitle
}`

const homePageQuery = groq`*[_type == "homePage" && language == $language][0]{
  seoTitle,
  seoDescription,
  heroTitle,
  heroSubtitle,
  "heroVideoUrl": heroVideo.asset->url,
  heroSecondaryImage ${imageProjection},
  heroCraftedLine,
  heroRootedLine,
  heroInNatureLine,
  welcomeTitle,
  welcomeParagraphs[],
  welcomeImage ${imageProjection},
  stats[]{
    value,
    label
  },
  hotelSection ${teaserProjection},
  roomsDividerImage ${imageProjection},
  roomsSection ${teaserProjection},
  culinaryDividerImage ${imageProjection},
  culinarySection ${teaserProjection},
  experiencesDividerImage ${imageProjection},
  experiencesBand ${homeExperiencesBandProjection}
}`

const aboutPageQuery = groq`*[_type == "aboutPage" && language == $language][0]{
  seoTitle,
  seoDescription,
  heroTitle,
  heroSubtitle,
  heroImage ${imageProjection},
  originEyebrow,
  originTitle,
  originParagraphs[],
  originPrimaryImage ${imageProjection},
  originSecondaryImage ${imageProjection},
  animalsBreakImage ${imageProjection},
  transformEyebrow,
  transformTitle,
  transformParagraphs[],
  transformImage ${imageProjection},
  quote,
  farmEyebrow,
  farmTitle,
  farmParagraphs[],
  farmImages[] ${imageProjection},
  roomsEyebrow,
  roomsTitle,
  roomsIntro,
  roomsImage ${imageProjection},
  roomFloors[]{
    title,
    description
  },
  roomsLink ${linkProjection}
}`

const restaurantPageQuery = groq`*[_type == "restaurantPage" && language == $language][0]{
  seoTitle,
  seoDescription,
  heroTitle,
  heroSubtitle,
  heroImage ${imageProjection},
  originEyebrow,
  originTitle,
  originParagraphs[],
  originPrimaryImage ${imageProjection},
  ingredientsBreakImage ${imageProjection},
  spiritsEyebrow,
  spiritsTitle,
  spiritsParagraphs[],
  spiritsImage ${imageProjection},
  quote,
  farmEyebrow,
  farmTitle,
  farmParagraphs[],
  farmImages[] ${imageProjection},
  atmosphereImage ${imageProjection},
  atmosphereEyebrow,
  atmosphereTitle,
  atmosphereIntro,
  highlights[]{
    title,
    description
  }
}`

const culinaryPageQuery = groq`*[_type == "culinaryPage" && language == $language][0]{
  seoTitle,
  seoDescription,
  heroTitle,
  heroSubtitle,
  heroImage ${imageProjection}
}`

const experiencesPageQuery = groq`*[_type == "experiencesPage" && language == $language][0]{
  language,
  seoTitle,
  seoDescription,
  heroTitle,
  heroSubtitle,
  heroImage ${imageProjection},
  "experienceVideoUrl": experienceVideo.asset->url,
  introEyebrow,
  introTitle,
  introParagraphs[],
  activitiesEyebrow,
  activitiesTitle,
  activities[]{
    _key,
    title,
    description,
    image ${imageProjection}
  },
  closingQuote
}`

const wellnessPageQuery = groq`*[_type == "wellnessPage" && language == $language][0]{
  seoTitle,
  seoDescription,
  heroTitle,
  heroSubtitle,
  heroImage ${imageProjection},
  introEyebrow,
  introTitle,
  introParagraphs[],
  introImage ${imageProjection},
  breakImage ${imageProjection},
  highlightEyebrow,
  highlightTitle,
  highlightParagraphs[],
  highlightImage ${imageProjection},
  quote,
  featuresEyebrow,
  featuresTitle,
  features[]{
    _key,
    title,
    description,
    image ${imageProjection}
  }
}`

const localCheesePageQuery = groq`*[_type == "localCheesePage" && language == $language][0]{
  seoTitle,
  seoDescription,
  heroTitle,
  heroSubtitle,
  heroImage ${imageProjection},
  legacyEyebrow,
  legacyTitle,
  legacyParagraphs[],
  legacyImage ${imageProjection},
  cellarBreakImage ${imageProjection},
  signatureEyebrow,
  signatureTitle,
  signatureParagraphs[],
  signatureImage ${imageProjection},
  quote,
  collectionEyebrow,
  collectionTitle,
  collections[]{
    _key,
    title,
    milk,
    experience,
    variations,
    pairing,
    image ${imageProjection}
  },
  seasonalityEyebrow,
  seasonalityTitle,
  seasonalityIntro,
  seasonalityNotes[]
}`

const roomsPageQuery = groq`*[_type == "roomsPage" && language == $language][0]{
  seoTitle,
  seoDescription,
  heroTitle,
  heroSubtitle,
  heroImage ${imageProjection},
  roomLabel,
  backToRoomsLabel,
  bookThisRoomLabel,
  galleryTitle,
  discoverSpaceLabel
}`

const roomsQuery = groq`*[_type == "room" && language == $language] | order(order asc){
  title,
  "slug": slug.current,
  order,
  tagline,
  "heroImage": galleryImages[0] ${imageProjection}
}`

const roomQuery = groq`*[_type == "room" && language == $language && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  order,
  seoTitle,
  seoDescription,
  tagline,
  description,
  galleryImages[] ${imageProjection}
}`

const roomSlugsQuery = groq`*[_type == "room" && language == $language]{
  "slug": slug.current
}`

async function fetchWithFallback<T>(
  query: string,
  language: SiteLanguage,
  tags: string[],
  params: Record<string, unknown> = {},
) {
  const queryOptions = {
    next: {
      tags: [SANITY_TAGS.all, ...tags],
    },
  }

  const localized = await client.fetch<T | null>(query, {language, ...params}, queryOptions)

  if (localized || language === DEFAULT_LANGUAGE) {
    return localized
  }

  return client.fetch<T | null>(query, {language: DEFAULT_LANGUAGE, ...params}, queryOptions)
}

export async function fetchSiteSettings(language: SiteLanguage) {
  return fetchWithFallback<SiteSettingsData>(siteSettingsQuery, language, [SANITY_TAGS.siteSettings])
}

export async function fetchNavigation(language: SiteLanguage) {
  return fetchWithFallback<NavigationData>(navigationQuery, language, [SANITY_TAGS.navigation])
}

export async function fetchHomePage(language: SiteLanguage) {
  return fetchWithFallback<HomePageData>(homePageQuery, language, [SANITY_TAGS.homePage])
}

export async function fetchAboutPage(language: SiteLanguage) {
  return fetchWithFallback<AboutPageData>(aboutPageQuery, language, [SANITY_TAGS.aboutPage])
}

export async function fetchRestaurantPage(language: SiteLanguage) {
  return fetchWithFallback<RestaurantPageData>(restaurantPageQuery, language, [SANITY_TAGS.restaurantPage])
}

export async function fetchCulinaryPage(language: SiteLanguage) {
  return fetchWithFallback<CulinaryPageData>(culinaryPageQuery, language, [SANITY_TAGS.culinaryPage])
}

export async function fetchExperiencesPage(language: SiteLanguage) {
  return fetchWithFallback<ExperiencesPageData>(experiencesPageQuery, language, [SANITY_TAGS.experiencesPage])
}

export async function fetchWellnessPage(language: SiteLanguage) {
  return fetchWithFallback<WellnessPageData>(wellnessPageQuery, language, [SANITY_TAGS.wellnessPage])
}

export async function fetchLocalCheesePage(language: SiteLanguage) {
  return fetchWithFallback<LocalCheesePageData>(localCheesePageQuery, language, [SANITY_TAGS.localCheesePage])
}

export async function fetchRoomsPage(language: SiteLanguage) {
  return fetchWithFallback<RoomsPageData>(roomsPageQuery, language, [SANITY_TAGS.roomsPage])
}

export async function fetchRooms(language: SiteLanguage) {
  return (await fetchWithFallback<RoomCardData[]>(roomsQuery, language, [SANITY_TAGS.room])) ?? []
}

export async function fetchRoom(language: SiteLanguage, slug: string) {
  return fetchWithFallback<RoomPageData>(
    roomQuery,
    language,
    [SANITY_TAGS.room, roomSlugTag(slug)],
    {slug},
  )
}

export async function fetchRoomSlugs(language: SiteLanguage) {
  const rows = await fetchWithFallback<Array<{slug: string}>>(roomSlugsQuery, language, [SANITY_TAGS.room])
  return (rows ?? []).map((row) => row.slug)
}
