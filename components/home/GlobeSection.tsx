import Image from 'next/image';
import GlobeClient from '@/components/globe/GlobeClient';
import { VISITED_COUNTRIES, LIVED_COUNTRIES } from '@/data/countries';

export default function GlobeSection() {
  return (
    <section id="about" className="pt-40 bg-black">
      {/* About Me Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: About Text */}
          <div className="text-left space-y-4">
            <h2 className="text-4xl font-bold text-white mb-6">
              About Me
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a passionate traveler who believes that the world is a book, and those who don't travel read only one page. 
              Over the years, I've been fortunate enough to explore diverse cultures, taste exotic cuisines, and witness 
              breathtaking landscapes across multiple continents.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              From living in the vibrant cities of Singapore and Canada to exploring the ancient temples of Japan and the 
              serene backwaters of India, each journey has shaped my perspective and enriched my life in countless ways.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              This globe represents my journey so far - the orange dots mark places I've called home, the green ones 
              show countries I've explored, and there are still so many destinations waiting to be discovered. 
              Join me as I continue to explore this beautiful world!
            </p>
          </div>

          {/* Right: Profile Picture */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-100 h-100 rounded-full overflow-hidden">
              <Image
                src="/images/pfp.webp"
                alt="Profile picture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Globe Title */}
      <div className="container mx-auto px-4 py-20 text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          My Travel Journey
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Click on any country to explore my experiences, photos, and stories
          from around the world.
        </p>
      </div>
      
      {/* Globe */}
      <div id="globe" className="w-full h-150">
        <GlobeClient
          lived={LIVED_COUNTRIES}
          visited={VISITED_COUNTRIES}
        />
      </div>
    </section>
  );
}