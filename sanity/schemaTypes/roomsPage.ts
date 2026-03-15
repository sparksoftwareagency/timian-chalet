import {defineField, defineType} from 'sanity'

import {languageField, seoFields} from './shared'

export const roomsPageType = defineType({
  name: 'roomsPage',
  title: 'Rooms page',
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
      name: 'roomLabel',
      title: 'Room label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backToRoomsLabel',
      title: 'Back to rooms label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bookThisRoomLabel',
      title: 'Book this room label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'galleryTitle',
      title: 'Gallery title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discoverSpaceLabel',
      title: 'Discover space label',
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
