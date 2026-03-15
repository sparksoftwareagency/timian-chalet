import {defineField, defineType} from 'sanity'

export const navGroup = defineType({
  name: 'navGroup',
  title: 'Navigation group',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'linkObject'}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'links.0.label',
    },
  },
})
