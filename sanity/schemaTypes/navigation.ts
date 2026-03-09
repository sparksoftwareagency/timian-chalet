import {defineField, defineType} from 'sanity'

import {languageField} from './shared'

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    languageField,
    defineField({
      name: 'languageSwitcherLabelEnglish',
      title: 'Language label for English',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'languageSwitcherLabelRomanian',
      title: 'Language label for Romanian',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'languageSwitcherLabelHungarian',
      title: 'Language label for Hungarian',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bookNowLabel',
      title: 'Book now label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'utilityLinks',
      title: 'Utility links',
      type: 'array',
      of: [{type: 'linkObject'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'menuGroups',
      title: 'Menu groups',
      type: 'array',
      of: [{type: 'navGroup'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'roomsGroupTitle',
      title: 'Rooms group title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'bookNowLabel',
      subtitle: 'language',
    },
  },
})
