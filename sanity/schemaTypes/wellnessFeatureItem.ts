import {defineField, defineType} from 'sanity'

export const wellnessFeatureItem = defineType({
  name: 'wellnessFeatureItem',
  title: 'Wellness feature item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      description:
        'Upload one image for a static render, or multiple images to render this feature as a slider.',
      type: 'array',
      of: [{type: 'imageBlock'}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'images.0.image',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle,
        media,
      }
    },
  },
})
