import {defineField, defineType} from 'sanity'

import {languageField, seoFields} from './shared'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About page',
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
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({
      name: 'originPrimaryImage',
      title: 'Origin primary image',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'animalsBreakImages',
      title: 'Animals break images',
      description: 'Five images shown side-by-side as the first divider section.',
      type: 'array',
      of: [{type: 'imageBlock'}],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const hasGalleryImages = Array.isArray(value) && value.length === 5
          const hasLegacyImage = Boolean((context.document as {animalsBreakImage?: unknown})?.animalsBreakImage)

          return hasGalleryImages || hasLegacyImage ? true : 'Add exactly five animals break images'
        }),
    }),
    defineField({
      // Legacy single-image field kept hidden for migration compatibility.
      name: 'animalsBreakImage',
      title: 'Animals break image (legacy)',
      type: 'imageBlock',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'transformEyebrow',
      title: 'Transformation eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'transformTitle',
      title: 'Transformation title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'transformParagraphs',
      title: 'Transformation paragraphs',
      type: 'array',
      of: [{type: 'text'}],
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({
      name: 'transformImage',
      title: 'Transformation image',
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
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({
      name: 'farmImages',
      title: 'Farm images',
      type: 'array',
      of: [{type: 'imageBlock'}],
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({
      name: 'roomsEyebrow',
      title: 'Rooms eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roomsTitle',
      title: 'Rooms title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roomsIntro',
      title: 'Rooms intro',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roomsImage',
      title: 'Rooms image',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roomFloors',
      title: 'Room floors',
      type: 'array',
      of: [{type: 'roomFloorItem'}],
      validation: (Rule) => Rule.required().length(3),
    }),
    defineField({
      name: 'roomsLink',
      title: 'Rooms link',
      type: 'linkObject',
      validation: (Rule) => Rule.required(),
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
