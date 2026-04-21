import {defineField, defineType} from 'sanity'

import {languageField, seoFields} from './shared'

export const wellnessPageType = defineType({
  name: 'wellnessPage',
  title: 'Wellness page',
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
      name: 'introEyebrow',
      title: 'Intro eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introTitle',
      title: 'Intro title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introParagraphs',
      title: 'Intro paragraphs',
      type: 'array',
      of: [{type: 'text'}],
      validation: (Rule) => Rule.required().min(2).max(3),
    }),
    defineField({
      name: 'introImage',
      title: 'Intro image',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'breakImages',
      title: 'Break images',
      description: 'Upload one image for a static section image, or multiple images for a slider.',
      type: 'array',
      of: [{type: 'imageBlock'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'highlightEyebrow',
      title: 'Highlight eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlightTitle',
      title: 'Highlight title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlightParagraphs',
      title: 'Highlight paragraphs',
      type: 'array',
      of: [{type: 'text'}],
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({
      name: 'flyerButtonLabel',
      title: 'Flyer button label',
      description: 'Label for the flyer CTA button shown on the wellness page.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'flyerPdf',
      title: 'Flyer PDF file',
      description:
        'Upload the PDF shown in the flyer modal. Use this instead of a raw URL.',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlightImage',
      title: 'Highlight image',
      description: 'Single background image used for the treatment list download section.',
      type: 'imageBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuresEyebrow',
      title: 'Features eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuresTitle',
      title: 'Features title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuresBreakImages',
      title: 'Features break images',
      description: 'Five images shown side-by-side between the first two and remaining features.',
      type: 'array',
      of: [{type: 'imageBlock'}],
      validation: (Rule) => Rule.required().min(5).max(5),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'wellnessFeatureItem'}, {type: 'experienceItem'}],
      validation: (Rule) => Rule.required().length(4),
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
