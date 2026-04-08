import {defineField, defineType} from 'sanity'

import {languageField, seoFields} from './shared'

export const localCheesePageType = defineType({
  name: 'localCheesePage',
  title: 'Local cheese page',
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
      name: 'legacyEyebrow',
      title: 'Legacy eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'legacyTitle',
      title: 'Legacy title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'legacyParagraphs',
      title: 'Legacy paragraphs',
      type: 'array',
      of: [{type: 'text'}],
      validation: (Rule) => Rule.required().min(2).max(4),
    }),
    defineField({
      name: 'legacyImage',
      title: 'Legacy image',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cellarBreakImage',
      title: 'Cellar break image',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'signatureEyebrow',
      title: 'Signature eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'signatureTitle',
      title: 'Signature title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'signatureParagraphs',
      title: 'Signature paragraphs',
      type: 'array',
      of: [{type: 'text'}],
      validation: (Rule) => Rule.required().length(3),
    }),
    defineField({
      name: 'signatureImage',
      title: 'Signature image',
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
      name: 'collectionEyebrow',
      title: 'Collection eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'collectionTitle',
      title: 'Collection title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [{type: 'localCheeseItem'}],
      validation: (Rule) => Rule.required().length(4),
    }),
    defineField({
      name: 'collectionsBreakImages',
      title: 'Collections break images',
      description:
        'Four images shown side-by-side between the collections and seasonality sections.',
      type: 'array',
      of: [{type: 'imageBlock'}],
      validation: (Rule) => Rule.required().length(4),
    }),
    defineField({
      name: 'seasonalityVideo',
      title: 'Seasonality video',
      description: 'Video file for the final seasonality split section (9:16).',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seasonalityEyebrow',
      title: 'Seasonality eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seasonalityTitle',
      title: 'Seasonality title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seasonalityIntro',
      title: 'Seasonality intro',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seasonalityNotes',
      title: 'Seasonality notes',
      type: 'array',
      of: [{type: 'text'}],
      validation: (Rule) => Rule.required().length(2),
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
