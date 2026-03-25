import {defineField, defineType} from 'sanity'

export const localCheeseItem = defineType({
  name: 'localCheeseItem',
  title: 'Local cheese item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'milk',
      title: 'Milk',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variations',
      title: 'Variations',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pairing',
      title: 'Pairing',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'milk',
      media: 'image.image',
    },
  },
})
