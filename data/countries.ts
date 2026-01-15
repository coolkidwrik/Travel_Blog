export type CountryData = {
  code: string;
  name: string;
  tagline: string;
  trip: {
    date: string;
    duration: string;
    highlights: string[];
    story: string;
  };
  gallery: {
    images: Array<{
      url: string;
      caption: string;
      alt: string;
    }>;
  };
};

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

// TODO: place holder data till I figure out Sanity backend setup
const countryDatabase: Record<string, CountryData> = {
  jpn: {
    code: 'JPN',
    name: 'Japan',
    tagline: 'Land of the Rising Sun',
    trip: {
      date: 'April 2023',
      duration: '2 weeks',
      highlights: [
        'Cherry blossom season in Kyoto',
        'Traditional tea ceremony experience',
        'Exploring Tokyo\'s vibrant neighborhoods',
        'Hiking Mount Fuji at sunrise',
        'Visiting ancient temples and shrines',
      ],
      story: `Japan exceeded all expectations. From the serene temples of Kyoto to the electric energy of Tokyo, every moment was unforgettable.

The cherry blossoms were in full bloom, creating a magical atmosphere everywhere we went. We spent hours wandering through Maruyama Park, watching locals picnic under the pink canopies.

In Tokyo, the contrast between traditional and modern was striking. One moment we were in a 400-year-old temple, the next in a futuristic robot restaurant. The food was incredible - from street ramen to kaiseki dinners.

The highlight was definitely climbing Mount Fuji. Starting at midnight, we reached the summit just as the sun rose over the clouds. It was one of the most beautiful moments of my life.`,
    },
    gallery: {
      images: [
        {
          url: '/images/japan/placeholder-1.jpg',
          caption: 'Cherry blossoms in full bloom at Maruyama Park, Kyoto',
          alt: 'Pink cherry blossoms with traditional temple in background',
        },
        {
          url: '/images/japan/placeholder-2.jpg',
          caption: 'Sunrise from the summit of Mount Fuji',
          alt: 'Panoramic view of clouds and sunrise from mountain peak',
        },
        {
          url: '/images/japan/placeholder-3.jpg',
          caption: 'Traditional street in Gion district, Kyoto',
          alt: 'Historic wooden buildings lining a traditional Japanese street',
        },
      ],
    },
  },
};

export function getCountryData(code: string): CountryData | null {
  return countryDatabase[code.toLowerCase()] || null;
}

export function getAllCountryCodes(): string[] {
  return Object.keys(countryDatabase);
}

export function isVisitedCountry(code: string): boolean {
  const upperCode = code.toUpperCase();
  return VISITED_COUNTRIES.includes(upperCode) || LIVED_COUNTRIES.includes(upperCode);
}

export function hasCountryData(code: string): boolean {
  return !!countryDatabase[code.toLowerCase()];
}