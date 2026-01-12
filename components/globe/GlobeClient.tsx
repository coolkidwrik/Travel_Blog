'use client';

import dynamic from 'next/dynamic';

const GlobeComponent = dynamic(
  () => import('./GlobeComponent'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-black flex items-center justify-center text-white">
        Loading Globe...
      </div>
    ),
  }
);

type GlobeClientProps = {
  lived: string[];
  visited: string[];
};

export default function GlobeClient({ lived, visited }: GlobeClientProps) {
  return <GlobeComponent lived={lived} visited={visited} />;
}