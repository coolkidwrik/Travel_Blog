import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'country',
  title: 'Country',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Country Code',
      type: 'string',
      description: 'ISO 3166-1 alpha-3 code (e.g., JPN, USA, IND)',
      validation: (Rule) => Rule.required().length(3).uppercase(),
    }),
    defineField({
      name: 'name',
      title: 'Country Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short catchy phrase about the country',
    }),
    defineField({
      name: 'status',
      title: 'Visit Status',
      type: 'string',
      options: {
        list: [
          {title: 'Lived', value: 'lived'},
          {title: 'Visited', value: 'visited'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'trip',
      title: 'Trip Details',
      type: 'object',
      fields: [
        {
          name: 'date',
          title: 'Date Visited',
          type: 'string',
          description: 'e.g., "April 2023" or "2018 - 2021"',
        },
        {
          name: 'duration',
          title: 'Duration',
          type: 'string',
          description: 'e.g., "2 weeks" or "3 years"',
        },
        {
          name: 'highlights',
          title: 'Quick Highlights',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Bullet points of trip highlights (3-5 items)',
        },
        {
          name: 'content',
          title: 'Trip Story Content',
          type: 'array',
          description: 'Mix text paragraphs and images (3-7 blocks) to tell your story',
          of: [
            // Text block
            {
              type: 'object',
              name: 'textBlock',
              title: 'Text Paragraph',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  title: 'Text',
                  rows: 8,
                },
              ],
              preview: {
                select: {
                  text: 'text',
                },
                prepare({ text }) {
                  return {
                    title: text?.substring(0, 100) + '...' || 'Empty text block',
                    subtitle: 'Text Block',
                  }
                },
              },
            },
            // Image block
            {
              type: 'object',
              name: 'imageBlock',
              title: 'Image with Caption',
              fields: [
                {
                  name: 'image',
                  type: 'image',
                  title: 'Image',
                  options: {
                    hotspot: true,
                  },
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Caption',
                  description: 'Brief description of the image',
                },
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                  description: 'Describe the image for accessibility',
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  media: 'image',
                  caption: 'caption',
                },
                prepare({ media, caption }) {
                  return {
                    title: caption || 'Image',
                    subtitle: 'Image Block',
                    media,
                  }
                },
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      description: 'Complete photo gallery (20-30 images)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              media: 'image',
              caption: 'caption',
            },
            prepare({ media, caption }) {
              return {
                title: caption || 'Gallery Image',
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'featuredImage',
    },
  },
})