import { Metadata } from 'next';
import CountryContent from '@/components/country/CountryContent';
import UnderConstruction from '@/components/country/UnderConstruction';
import { getCountryData, getAllCountryCodes, isVisitedCountry } from '@/data/countries';
import { notFound } from 'next/navigation';

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

  // Check if data exists for this country
  const countryData = getCountryData(iso);
  
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
  const codes = getAllCountryCodes();
  return codes.map((code) => ({
    iso: code.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ iso: string }> }): Promise<Metadata> {
  const { iso } = await params;
  const countryData = getCountryData(iso);
  
  if (!countryData) {
    return {
      title: 'Country - Travel Chronicles',
    };
  }

  return {
    title: `${countryData.name} - Travel Chronicles`,
    description: `${countryData.tagline}. ${countryData.trip.story.substring(0, 150)}...`,
  };
}
