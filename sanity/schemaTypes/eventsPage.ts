import {defineField, defineType} from 'sanity'

import {languageField, seoFields} from './shared'

export const eventsPageType = defineType({
  name: 'eventsPage',
  title: 'Events page',
  type: 'document',
  fields: [
    languageField,
    ...seoFields,
    defineField({
      name: 'heroEyebrow',
      title: 'Hero eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitle',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emptyStateText',
      title: 'Empty state text',
      description: 'Shown on the listing when there are no events.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'viewDetailsLabel',
      title: 'View details label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backToEventsLabel',
      title: 'Back to events label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ledByLabel',
      title: 'Led by label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detailsTitle',
      title: 'Details section title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whenLabel',
      title: 'When label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whereLabel',
      title: 'Where label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hostsLabel',
      title: 'Hosts label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaSubtitle',
      title: 'CTA subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'callLabel',
      title: 'Call button label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emailLabel',
      title: 'Email button label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'language',
    },
  },
})
