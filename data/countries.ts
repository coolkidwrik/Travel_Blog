import { 
  getCountryByCode, 
  getCountriesByStatus, 
  getAllCountryCodes as getSanityCodes,
  countryExists 
} from '@/lib/sanity/queries'

// import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type TripContentBlock = 
  | { type: 'text'; text: string }
  | { type: 'image'; url: string; caption: string; alt: string; _rawImage?: any }

export type CountryData = {
  code: string
  name: string
  tagline: string
  featuredImage?: any // SanityImageSource
  trip: {
    date: string
    duration: string
    highlights: string[]
    content: TripContentBlock[]
  }
  gallery: Array<{
    url: string
    caption: string
    alt: string
    _rawImage?: any // SanityImageSource
  }>
}


// Countries I've lived in
///////////////////////////////////////////////////////////
export const LIVED_COUNTRIES = ['IND', 'CAN', 'SGP'];

// Countries I've visited
///////////////////////////////////////////////////////////
export const VISITED_COUNTRIES = [
  'AUT', // Austria
  'BHR', // Bahrain
  'KHM', // Cambodia
  'CHN', // China
  'CZE', // Czechia
  'HUN', // Hungary
  'IDN', // Indonesia
  'JPN', // Japan
  'MYS', // Malaysia
  'MDV', // Maldives
  'NZL', // New Zealand
  'PHL', // Philippines
  'SVK', // Slovakia
  'ZAF', // South Africa
  'LKA', // Sri Lanka
  'THA', // Thailand
  'TUR', // Turkey
  'ARE', // UAE
  'USA', // United States
  'VNM', // Vietnam
  'ZMB', // Zambia
  'ZWE', // Zimbabwe
];

export async function getCountryData(code: string): Promise<CountryData | null> {
  try {
    const data = await getCountryByCode(code)
    return data
  } catch (error) {
    console.error('Error fetching country data:', error)
    return null
  }
}

export async function getAllCountryCodes(): Promise<string[]> {
  try {
    return await getSanityCodes()
  } catch (error) {
    console.error('Error fetching country codes:', error)
    return []
  }
}

export function isVisitedCountry(code: string): boolean {
  const upperCode = code.toUpperCase()
  return VISITED_COUNTRIES.includes(upperCode) || LIVED_COUNTRIES.includes(upperCode)
}

export async function hasCountryData(code: string): Promise<boolean> {
  try {
    return await countryExists(code)
  } catch (error) {
    console.error('Error checking country existence:', error)
    return false
  }
}

export async function getLivedCountries(): Promise<string[]> {
  try {
    const countries = await getCountriesByStatus('lived')
    return countries.map((c: any) => c.code)
  } catch (error) {
    console.error('Error fetching lived countries:', error)
    return LIVED_COUNTRIES
  }
}

export async function getVisitedCountries(): Promise<string[]> {
  try {
    const countries = await getCountriesByStatus('visited')
    return countries.map((c: any) => c.code)
  } catch (error) {
    console.error('Error fetching visited countries:', error)
    return VISITED_COUNTRIES
  }
}