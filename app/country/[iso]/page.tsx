import { Metadata } from 'next';
import CountryContent from '@/components/country/CountryContent';
import UnderConstruction from '@/components/country/UnderConstruction';
import { getCountryData, getAllCountryCodes, isVisitedCountry } from '@/data/countries';
import { notFound } from 'next/navigation';
import { urlFor } from '@/lib/sanity/client';

type Props = {
  params: Promise<{ iso: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export default async function CountryPage({ params, searchParams }: Props) {
  const { iso } = await params;
  const { tab } = await searchParams;
  
  // Check if country has been visited
  if (!isVisitedCountry(iso)) {
    notFound(); // Show "Haven't Been Here Yet" page
  }

  // Check if data exists for this country in Sanity
  const countryData = await getCountryData(iso);
  
  if (!countryData) {
    // Visited but no data yet - show "Under Construction"
    return <UnderConstruction countryCode={iso} />;
  }

  const currentTab = tab || 'trip';

  return (
    <CountryContent 
      countryData={countryData} 
      initialTab={currentTab} 
    />
  );
}

export async function generateStaticParams() {
  const codes = await getAllCountryCodes();
  return codes.map((code) => ({
    iso: code.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ iso: string }> }): Promise<Metadata> {
  const { iso } = await params;
  const countryData = await getCountryData(iso);
  
  if (!countryData) {
    return {
      title: "Travel Guide",
      description: 'Explore travel stories and experiences from around the world.',
    };
  }

  // Extract text from first content block for description
  const firstTextBlock = countryData.trip.content?.find(block => block.type === 'text');
  const description = firstTextBlock 
    ? `${countryData.tagline}. ${firstTextBlock.text.substring(0, 150)}...`
    : `${countryData.tagline}. Explore my travel experiences in ${countryData.name}.`;

  // Get featured image for social sharing
  const ogImage = countryData.featuredImage
    ? urlFor(countryData.featuredImage)
        .width(1200)
        .height(630)
        .fit('crop')
        .url()
    : '/images/default-og-image.jpg';

  return {
    metadataBase: new URL('https://ckwrik-travel.vercel.app'),

    // Basic metadata
    title: `${countryData.name} Travel Guide & Experience`,
    description: description,

    alternates: {
      canonical: `https://ckwrik-travel.vercel.app/country/${iso}`,
    },
    
    // Keywords for SEO
    keywords: [
      "C.K.Wrik's Travel Blog",
      "C.K.Wrik",
      countryData.name,
      'travel',
      'travel blog',
      'travel photography',
      'travel experiences',
      `${countryData.name} travel`,
      `visit ${countryData.name}`,
      'world travel',
    ],

    // Author info
    authors: [{ name: 'Wrik Steven Sen' }],
    
    // Open Graph (Facebook, LinkedIn)
    openGraph: {
      title: `${countryData.name} Travel Guide & Experience`,
      description: description,
      url: `https://ckwrik-travel.vercel.app/country/${iso}`,
      siteName: "C.K.Wrik's Travel Blog",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${countryData.name} - ${countryData.tagline}`,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: `${countryData.name} - C.K.Wrik's Travel Blog`,
      description: description,
      images: [ogImage],
      creator: '@sen_wrik', // Add your Twitter handle
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Alternate languages (if you add translations later)
    // alternates: {
    //   canonical: `https://ckwrik-travel.vercel.app/country/${iso}`,
    //   languages: {
    //     'en-US': `https://ckwrik-travel.vercel.app/country/${iso}`,
    //   },
    // },
  };
}