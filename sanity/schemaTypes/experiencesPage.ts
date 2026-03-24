import {defineField, defineType} from 'sanity'

import {languageField, seoFields} from './shared'

export const experiencesPageType = defineType({
  name: 'experiencesPage',
  title: 'Experiences page',
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
      name: 'introEyebrow',
      title: 'Intro eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introTitle',
      title: 'Intro title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introParagraphs',
      title: 'Intro paragraphs',
      type: 'array',
      of: [{type: 'text'}],
      validation: (Rule) => Rule.required().min(2).max(3),
    }),
    defineField({
      name: 'activitiesEyebrow',
      title: 'Activities eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'activitiesTitle',
      title: 'Activities title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [{type: 'experienceItem'}],
      validation: (Rule) => Rule.required().length(4),
    }),
    defineField({
      name: 'closingQuote',
      title: 'Closing quote',
      type: 'string',
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
