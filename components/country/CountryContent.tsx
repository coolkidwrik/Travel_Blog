import Image from 'next/image';  // ← ADDED
import CountryTabs from './CountryTabs';
import type { CountryData } from '@/data/countries';

type CountryContentProps = {
  countryData: CountryData;
  initialTab: string;
};

export default function CountryContent({ countryData, initialTab }: CountryContentProps) {
  return (
    <div className="bg-linear-to-t from-[#000726] via-black via-80% to-black">
      {/* Featured Image Hero */}  {/* ← ADDED THIS SECTION */}
      {countryData.featuredImage && (
        <section className="relative h-96 w-full overflow-hidden border-t border-gray-800">
          <Image
            src={countryData.featuredImage}
            alt={`${countryData.name} featured image`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/50 to-black"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-white mb-2 drop-shadow-lg">
                {countryData.name}
              </h1>
              <p className="text-2xl text-gray-200 drop-shadow-md">{countryData.tagline}</p>
            </div>
          </div>
        </section>
      )}

      {/* Country Header (fallback if no featured image) */}  {/* ← ADDED */}
      {!countryData.featuredImage && (
        <section className="py-12 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-white mb-2">
              {countryData.name}
            </h1>
            <p className="text-xl text-gray-400">{countryData.tagline}</p>
          </div>
        </section>
      )}

      {/* Tabs Section */}
      <CountryTabs countryData={countryData} initialTab={initialTab} />
    </div>
  );
}