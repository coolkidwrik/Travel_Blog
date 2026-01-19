import GlobeClient from '@/components/globe/GlobeClient';

export default function GlobeSection() {
  return (
    <section id="globe" className="py-20 bg-black">
      <div className="container mx-auto px-4 text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          My Travel Journey
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Click on any country to explore my experiences, photos, and stories
          from around the world.
        </p>
      </div>
      
      <div className="w-full h-150">
        <GlobeClient
          lived={['IND', 'CAN', 'SGP']}
          visited={[
            'AUT', 'BHR', 'KHM', 'CHN', 'CZE', 'HUN', 'IDN', 'JPN',
            'MYS', 'MDV', 'NZL', 'PHL', 'SVK', 'ZAF', 'LKA', 'THA',
            'TUR', 'ARE', 'USA', 'VNM', 'ZMB', 'ZWE',
          ]}
        />
      </div>
    </section>
  );
}