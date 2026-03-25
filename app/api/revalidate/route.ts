import {revalidatePath, revalidateTag} from 'next/cache'
import {NextResponse} from 'next/server'

import {SITE_LOCALES} from '@/app/lib/locale'

const SANITY_REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET
const SECRET_HEADER = 'x-sanity-revalidate-secret'

type SanityWebhookBody = {
  _type?: string
  slug?: string | {current?: string}
}

function getSlug(payload: SanityWebhookBody) {
  if (!payload.slug) {
    return null
  }

  if (typeof payload.slug === 'string') {
    return payload.slug
  }

  return payload.slug.current ?? null
}

function getTypeTags(type?: string, slug?: string | null) {
  const tags = ['sanity']

  if (!type) {
    return tags
  }

  const typeTag = `sanity:${type}`
  tags.push(typeTag)

  if (type === 'room' && slug) {
    tags.push(`sanity:room:${slug}`)
  }

  return tags
}

function revalidateTypePaths(type?: string, slug?: string | null) {
  if (!type) {
    return
  }

  for (const locale of SITE_LOCALES) {
    if (type === 'homePage') {
      revalidatePath(`/${locale}`)
    }

    if (type === 'aboutPage') {
      revalidatePath(`/${locale}/about`)
    }

    if (type === 'restaurantPage') {
      revalidatePath(`/${locale}/restaurant`)
    }

    if (type === 'culinaryPage') {
      revalidatePath(`/${locale}/culinary`)
    }

    if (type === 'wellnessPage') {
      revalidatePath(`/${locale}/wellness`)
    }

    if (type === 'localCheesePage') {
      revalidatePath(`/${locale}/local-cheese`)
    }

    if (type === 'roomsPage' || type === 'room') {
      revalidatePath(`/${locale}/rooms`)
    }

    if (type === 'room' && slug) {
      revalidatePath(`/${locale}/rooms/${slug}`)
    }
  }
}

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return NextResponse.json({error: 'Method Not Allowed'}, {status: 405})
  }

  if (SANITY_REVALIDATE_SECRET) {
    const providedSecret = request.headers.get(SECRET_HEADER)
    if (!providedSecret || providedSecret !== SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }
  }

  let payload: SanityWebhookBody

  try {
    payload = (await request.json()) as SanityWebhookBody
  } catch {
    return NextResponse.json({error: 'Invalid JSON payload'}, {status: 400})
  }

  const type = payload._type
  const slug = getSlug(payload)

  const tags = getTypeTags(type, slug)
  for (const tag of tags) {
    revalidateTag(tag, 'max')
  }

  revalidateTypePaths(type, slug)

  return NextResponse.json({
    revalidated: true,
    type: type ?? null,
    slug,
    tags,
  })
}

