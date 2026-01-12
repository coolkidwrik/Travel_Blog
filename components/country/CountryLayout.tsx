'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, usePathname } from 'next/navigation';
import Tabs from './Tabs';
import TripContent from './TripContent';
import GalleryContent from './GalleryContent';
import type { CountryData } from '@/data/countries';

const GlobeComponent = dynamic(
  () => import('@/components/globe/GlobeComponent'),
  { ssr: false }
);

type CountryLayoutProps = {
  countryCode: string;
  countryData: CountryData;
  initialTab: string;
};

export default function CountryLayout({
  countryCode,
  countryData,
  initialTab,
}: CountryLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`${pathname}?tab=${tab}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-black">
      <section className="bg-linear-to-b from-gray-900 to-black py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-2">
            {countryData.name}
          </h1>
          <p className="text-xl text-gray-400">{countryData.tagline}</p>
        </div>
      </section>

      <section className="py-8 bg-black">
        <div className="container mx-auto px-4">
          <div className="w-full h-125 rounded-lg overflow-hidden">
            <GlobeComponent
              lived={['IND', 'CAN', 'SGP']}
              visited={[
                'AUT', 'BHR', 'KHM', 'CHN', 'CZE', 'HUN', 'IDN', 'JPN',
                'MYS', 'MDV', 'NZL', 'PHL', 'SVK', 'ZAF', 'LKA', 'THA',
                'TUR', 'ARE', 'USA', 'VNM', 'ZMB', 'ZWE',
              ]}
              initialSelected={countryCode}
            />
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-900">
        <div className="container mx-auto px-4">
          <Tabs activeTab={activeTab} onTabChangeAction={handleTabChange} />
          
          <div className="mt-8">
            {activeTab === 'trip' && <TripContent data={countryData.trip} />}
            {activeTab === 'gallery' && <GalleryContent data={countryData.gallery} />}
          </div>
        </div>
      </section>
    </div>
  );
}
