'use client';

import dynamic from 'next/dynamic';

const GlobeComponent = dynamic(
  () => import('./GlobeComponent'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-150 bg-black flex items-center justify-center text-white">
        Loading Globe...
      </div>
    ),
  }
);

export default GlobeComponent;