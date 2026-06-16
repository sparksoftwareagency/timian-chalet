import {defineField, defineType} from 'sanity'

import {isUniquePerLanguage, languageField, seoFields} from './shared'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    languageField,
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        isUnique: isUniquePerLanguage,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      description: 'Lower numbers are shown first in the events listing.',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    ...seoFields,
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'Small label shown above the title, e.g. "Yoga Retreat · Timian Chalet".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      description: 'Used to order events and mark them as upcoming or past.',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateLabel',
      title: 'Date label',
      description: 'Human-readable date shown on the page, e.g. "19–26 July 2026".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hosts',
      title: 'Hosts',
      description: 'People leading the event.',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'Short intro line shown in the hero, e.g. "Join us for the full retreat experience…".',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionParagraphs',
      title: 'Description paragraphs',
      description: 'Body copy shown in the "About" section.',
      type: 'array',
      of: [{type: 'text'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'flyer',
      title: 'Flyer',
      description: 'Poster / flyer image for the event.',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Contact phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Contact email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Start date',
      name: 'startDate',
      by: [{field: 'startDate', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'dateLabel',
      media: 'flyer.image',
    },
  },
})
