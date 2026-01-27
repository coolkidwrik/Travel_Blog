import Image from 'next/image';
import GlobeClient from '@/components/globe/GlobeClient';
import { VISITED_COUNTRIES, LIVED_COUNTRIES } from '@/data/countries';

export default function GlobeSection() {
  return (
    <section id="about" className="pt-40 bg-black">
      {/* About Me Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-6 items-center max-w-6xl mx-auto">
          {/* Left: About Text */}
          <div className="text-left space-y-4">
            <h2 className="text-4xl font-bold text-white mb-6">
              About Me
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Hi, I'm Wrik - a traveler at heart with a deep love for discovering new places, 
              unfamiliar cultures, and stories that live far beyond guidebooks and Instagram pins.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              My love for travel wasn't a sudden discovery; it was inherited. 
              My parents were always chasing new places, and my sister and I were often dragged along - 
              usually away from our comfortable rooms and into journeys we didn't yet know how to appreciate. 
              Somewhere between long drives and unfamiliar destinations, reluctance turned into curiosity, 
              and curiosity into something that stuck.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Since then, I've explored the vibrant streets of Southeast Asia, 
              the calm landscapes of New Zealand, and the historic cities of Europe. 
              Having lived in India, Singapore, and now Canada, I've learned to experience places not just as a visitor, 
              but by trying to live within them.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              This blog is a collection of those journeys: the roads less traveled, 
              the quiet moments between destinations, and the lessons learned along the way. 
              It's about curiosity over checklists, presence over pace, and making the most of wherever you happen to land.
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