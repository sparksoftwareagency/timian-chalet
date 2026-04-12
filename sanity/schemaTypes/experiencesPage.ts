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
      validation: (Rule) => Rule.required().min(4),
    }),
    defineField({
      name: 'experienceDividerImages',
      title: 'Experience divider images',
      type: 'array',
      of: [{type: 'imageBlock'}],
      validation: (Rule) => Rule.required().min(4).max(4),
    }),
    defineField({
      name: 'experienceVideo',
      title: 'Experience video',
      type: 'file',
      options: {accept: 'video/*'},
    }),
    defineField({
      name: 'experienceVideoSideImageLeft',
      title: 'Experience video side image (left)',
      type: 'imageBlock',
    }),
    defineField({
      name: 'experienceVideoSideImageRight',
      title: 'Experience video side image (right)',
      type: 'imageBlock',
    }),
    defineField({
      name: 'closingQuote',
      title: 'Closing quote',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'moreExperiencesTitle',
      title: 'More experiences title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'moreExperiences',
      title: 'More experiences',
      type: 'array',
      of: [{type: 'experienceItem'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'nearbyAttractionsTitle',
      title: 'Nearby attractions title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nearbyAttractions',
      title: 'Nearby attractions',
      type: 'array',
      of: [{type: 'experienceItem'}],
      validation: (Rule) => Rule.required().min(1).max(10),
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
