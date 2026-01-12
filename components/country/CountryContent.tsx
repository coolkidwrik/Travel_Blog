import CountryTabs from './CountryTabs';
import type { CountryData } from '@/data/countries';

type CountryContentProps = {
  countryData: CountryData;
  initialTab: string;
};

export default function CountryContent({ countryData, initialTab }: CountryContentProps) {
  return (
    <div className="bg-black">
      {/* Country Header */}
      <section className="bg-linear-to-b from-black to-gray-900 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-2">
            {countryData.name}
          </h1>
          <p className="text-xl text-gray-400">{countryData.tagline}</p>
        </div>
      </section>

      {/* Tabs Section */}
      <CountryTabs countryData={countryData} initialTab={initialTab} />
    </div>
  );
}