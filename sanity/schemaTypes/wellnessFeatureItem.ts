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
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const hasGalleryImages = Array.isArray(value) && value.length > 0
          const hasLegacyImage = Boolean((context.parent as {image?: unknown})?.image)

          return hasGalleryImages || hasLegacyImage ? true : 'Add at least one image'
        }),
    }),
    defineField({
      // Legacy single-image field kept hidden for migration compatibility.
      name: 'image',
      title: 'Image (legacy)',
      type: 'imageBlock',
      hidden: true,
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      mediaFromGallery: 'images.0.image',
      mediaFromLegacy: 'image.image',
    },
    prepare({title, subtitle, mediaFromGallery, mediaFromLegacy}) {
      return {
        title,
        subtitle,
        media: mediaFromGallery || mediaFromLegacy,
      }
    },
  },
})
