import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'travel_blog',

  projectId: 'oi2luk5c',
  dataset: 'production',

  basePath: '/admin',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
