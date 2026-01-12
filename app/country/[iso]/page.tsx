import CountryContent from '@/components/country/CountryContent';
import { getCountryData, getAllCountryCodes } from '@/data/countries';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ iso: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export default async function CountryPage({ params, searchParams }: Props) {
  const { iso } = await params;
  const { tab } = await searchParams;
  
  const countryData = getCountryData(iso);
  
  if (!countryData) {
    notFound();
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
  const codes = getAllCountryCodes();
  return codes.map((code) => ({
    iso: code.toLowerCase(),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ iso: string }> }) {
  const { iso } = await params;
  const countryData = getCountryData(iso);
  
  if (!countryData) {
    return {
      title: 'Country Not Found',
    };
  }

  return {
    title: `${countryData.name} - Travel Chronicles`,
    description: `${countryData.tagline}. ${countryData.trip.story.substring(0, 150)}...`,
  };
}
