'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Tabs from './Tabs';
import TripContent from './TripContent';
import GalleryContent from './GalleryContent';
import type { CountryData } from '@/data/countries';

type CountryTabsProps = {
  countryData: CountryData;
  initialTab: string;
};

export default function CountryTabs({ countryData, initialTab }: CountryTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`${pathname}?tab=${tab}`, { scroll: false });
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <Tabs activeTab={activeTab} onTabChangeAction={handleTabChange} />
        
        <div className="mt-8">
          {activeTab === 'trip' && <TripContent data={countryData.trip} />}
          {activeTab === 'gallery' && (
            <GalleryContent data={{ images: countryData.gallery }} />
          )}
        </div>
      </div>
    </section>
  );
}