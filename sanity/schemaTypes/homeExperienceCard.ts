import {defineArrayMember, defineField, defineType} from 'sanity'
import {EarthGlobeIcon} from '@sanity/icons'

export const homeExperienceCard = defineType({
  name: 'homeExperienceCard',
  title: 'Home experience card',
  icon: EarthGlobeIcon,
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
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Card link',
      type: 'linkObject',
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
      subtitle: 'link.href',
      media: 'image.image',
    },
  },
})

export const homeExperiencesBand = defineType({
  name: 'homeExperiencesBand',
  title: 'Home experiences band',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Intro description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cards',
      title: 'Experience cards',
      description: 'Exactly three cards (e.g. nature, culture, culinary).',
      type: 'array',
      of: [defineArrayMember({type: 'homeExperienceCard'})],
      validation: (Rule) => Rule.required().min(3).max(3),
    }),
  ],
})
