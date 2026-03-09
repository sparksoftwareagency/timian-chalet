import {defineField, defineType} from 'sanity'

export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Image block',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'image',
    },
  },
})
