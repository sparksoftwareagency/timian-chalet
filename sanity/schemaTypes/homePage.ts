import {defineField, defineType} from 'sanity'

import {languageField, seoFields} from './shared'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home page',
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
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero video',
      type: 'file',
      options: {accept: 'video/*'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSecondaryImage',
      title: 'Hero secondary image',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroCraftedLine',
      title: 'Hero crafted line',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroRootedLine',
      title: 'Hero rooted line',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroInNatureLine',
      title: 'Hero in nature line',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'welcomeTitle',
      title: 'Welcome title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'welcomeParagraphs',
      title: 'Welcome paragraphs',
      type: 'array',
      of: [{type: 'text'}],
      validation: (Rule) => Rule.required().length(3),
    }),
    defineField({
      name: 'welcomeImage',
      title: 'Welcome image',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'welcomeDividerImages',
      title: 'Welcome divider images',
      description: 'Vertical images shown after the welcome section.',
      type: 'array',
      of: [{type: 'imageBlock'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{type: 'statItem'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'hotelSection',
      title: 'Hotel section',
      type: 'teaserSection',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roomsDividerImage',
      title: 'Rooms divider image',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roomsSection',
      title: 'Rooms section',
      type: 'teaserSection',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roomsBreakImages',
      title: 'Rooms break images',
      description: 'Vertical images shown after the rooms section.',
      type: 'array',
      of: [{type: 'imageBlock'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'culinaryDividerImage',
      title: 'Culinary divider image',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'culinarySection',
      title: 'Culinary section',
      type: 'teaserSection',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experiencesDividerImage',
      title: 'Experiences divider image',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experiencesSection',
      title: 'Experiences section (legacy)',
      type: 'teaserSection',
      hidden: true,
      deprecated: {
        reason: 'Replaced by “Experiences band (landing cards)”. Safe to clear after content is migrated.',
      },
      readOnly: true,
    }),
    defineField({
      name: 'experiencesBand',
      title: 'Experiences band (landing cards)',
      type: 'homeExperiencesBand',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'language',
      media: 'welcomeImage.image',
    },
  },
})
