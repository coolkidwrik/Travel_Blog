import { MetadataRoute } from 'next'
import { getAllCountryCodes } from '@/data/countries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ckwrik-travel.vercel.app'
  
  // Get all country codes
  const countryCodes = await getAllCountryCodes()
  
  // Generate country page URLs
  const countryPages = countryCodes.map((code) => ({
    url: `${baseUrl}/country/${code}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...countryPages,
  ]
}