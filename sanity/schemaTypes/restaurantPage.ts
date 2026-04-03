import {defineField, defineType} from 'sanity'

import {languageField, seoFields} from './shared'

export const restaurantPageType = defineType({
  name: 'restaurantPage',
  title: 'Restaurant page',
  type: 'document',
  fields: [
    languageField,
    ...seoFields,
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'originEyebrow',
      title: 'Origin eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'originTitle',
      title: 'Origin title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'originParagraphs',
      title: 'Origin paragraphs',
      type: 'array',
      of: [{type: 'text'}],
      validation: (Rule) => Rule.required().min(2).max(4),
    }),
    defineField({
      name: 'originPrimaryImage',
      title: 'Origin primary image',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ingredientsBreakImages',
      title: 'Ingredients break images',
      description: 'Five images shown side-by-side between the origin and spirits sections.',
      type: 'array',
      of: [{type: 'imageBlock'}],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const hasGalleryImages = Array.isArray(value) && value.length === 5
          const hasLegacyImage = Boolean(
            (context.document as {ingredientsBreakImage?: unknown})?.ingredientsBreakImage,
          )

          return hasGalleryImages || hasLegacyImage
            ? true
            : 'Add exactly five ingredients break images'
        }),
    }),
    defineField({
      // Legacy single-image field kept hidden for migration compatibility.
      name: 'ingredientsBreakImage',
      title: 'Ingredients break image (legacy)',
      type: 'imageBlock',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'spiritsEyebrow',
      title: 'Spirits eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'spiritsTitle',
      title: 'Spirits title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'spiritsParagraphs',
      title: 'Spirits paragraphs',
      type: 'array',
      of: [{type: 'text'}],
      validation: (Rule) => Rule.required().min(2).max(3),
    }),
    defineField({
      name: 'spiritsImage',
      title: 'Spirits image',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'farmEyebrow',
      title: 'Farm eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'farmTitle',
      title: 'Farm title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'farmParagraphs',
      title: 'Farm paragraphs',
      type: 'array',
      of: [{type: 'text'}],
      validation: (Rule) => Rule.required().min(2).max(4),
    }),
    defineField({
      name: 'farmImages',
      title: 'Farm images',
      type: 'array',
      of: [{type: 'imageBlock'}],
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({
      name: 'atmosphereImage',
      title: 'Atmosphere image',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'atmosphereEyebrow',
      title: 'Atmosphere eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'atmosphereTitle',
      title: 'Atmosphere title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'atmosphereIntro',
      title: 'Atmosphere intro',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{type: 'roomFloorItem'}],
      validation: (Rule) => Rule.required().length(3),
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'language',
      media: 'heroImage.image',
    },
  },
})
