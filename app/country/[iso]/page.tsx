import CountryLayout from '@/components/country/CountryLayout';
import { getCountryData, getAllCountryCodes } from '@/data/countries';
import { notFound } from 'next/navigation';

type Props = {
  params: { code: string };
  searchParams: { tab?: string };
};

export default function CountryPage({ params, searchParams }: Props) {
  const countryData = getCountryData(params.code);
  
  if (!countryData) {
    notFound();
  }

  const currentTab = searchParams.tab || 'trip';

  return (
    <CountryLayout
      countryCode={params.code}
      countryData={countryData}
      initialTab={currentTab}
    />
  );
}

export async function generateStaticParams() {
  const codes = getAllCountryCodes();
  return codes.map((code) => ({
    code: code.toLowerCase(),
  }));
}
