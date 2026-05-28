import {defineField, defineType} from 'sanity'

import {languageField, seoFields} from './shared'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    languageField,
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    ...seoFields,
    defineField({
      name: 'ogImage',
      title: 'Default social share image',
      description: '1200x630 image used for Open Graph / Twitter previews when a page does not provide its own.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'logoDark',
      title: 'Dark logo',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoLight',
      title: 'Light logo',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'loadingBrand',
      title: 'Loading brand',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'loadingText',
      title: 'Loading text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bookNowLink',
      title: 'Book now link',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quickLinksHeading',
      title: 'Quick links heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick links',
      type: 'array',
      of: [{type: 'linkObject'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'servicesHeading',
      title: 'Services heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'contactHeading',
      title: 'Contact heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'addressLines',
      title: 'Address lines',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [{type: 'linkObject'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal links',
      type: 'array',
      of: [{type: 'linkObject'}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'language',
      media: 'logoDark',
    },
  },
})
