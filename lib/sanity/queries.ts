import { client } from './client'

export async function getAllCountries() {
  return client.fetch(`
    *[_type == "country"] | order(name asc) {
      code,
      name,
      status,
      "featuredImage": featuredImage.asset->url
    }
  `)
}

export async function getCountryByCode(code: string) {
  return client.fetch(
    `
    *[_type == "country" && lower(code) == lower($code)][0] {
      code,
      name,
      tagline,
      status,
      trip {
        date,
        duration,
        highlights,
        "content": content[] {
          _type == 'textBlock' => {
            "type": "text",
            text
          },
          _type == 'imageBlock' => {
            "type": "image",
            "url": image.asset->url,
            caption,
            alt
          }
        }
      },
      "gallery": gallery[] {
        "url": image.asset->url,
        caption,
        alt,
        "metadata": image.asset->metadata
      },
      "featuredImage": featuredImage.asset->url
    }
  `,
    { code }
  )
}

export async function getCountriesByStatus(status: 'lived' | 'visited') {
  return client.fetch(
    `
    *[_type == "country" && status == $status] {
      code,
      name
    }
  `,
    { status }
  )
}

export async function getAllCountryCodes() {
  const countries = await client.fetch(`
    *[_type == "country"] {
      code
    }
  `)
  return countries.map((c: any) => c.code.toLowerCase())
}

export async function countryExists(code: string): Promise<boolean> {
  const result = await client.fetch(
    `
    count(*[_type == "country" && lower(code) == lower($code)])
  `,
    { code }
  )
  return result > 0
}