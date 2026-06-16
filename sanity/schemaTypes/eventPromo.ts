import {defineField, defineType} from 'sanity'

export const eventPromo = defineType({
  name: 'eventPromo',
  title: 'Event promo band',
  type: 'object',
  description: 'Highlighted band on the landing page advertising an event.',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show on landing page',
      description: 'Turn the promo band on or off without deleting its content.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'dateLabel',
      title: 'Date label',
      description: 'e.g. "19–26 July 2026".',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'link',
      title: 'Call-to-action link',
      type: 'linkObject',
    }),
    defineField({
      name: 'image',
      title: 'Flyer / image',
      type: 'imageBlock',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'dateLabel',
      media: 'image.image',
      enabled: 'enabled',
    },
    prepare({title, subtitle, media, enabled}) {
      return {
        title: title || 'Event promo band',
        subtitle: `${enabled ? '● Live' : '○ Hidden'}${subtitle ? ` · ${subtitle}` : ''}`,
        media,
      }
    },
  },
})
