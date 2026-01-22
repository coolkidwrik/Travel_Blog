import Image from 'next/image';
import type { TripContentBlock } from '@/data/countries';

type TripData = {
  date: string;
  duration: string;
  highlights: string[];
  content: TripContentBlock[];
};

type TripContentProps = {
  data: TripData;
};

export default function TripContent({ data }: TripContentProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-8 text-white">
      {/* Date & Duration */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Date</h3>
          <p className="text-gray-300">{data.date}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Duration</h3>
          <p className="text-gray-300">{data.duration}</p>
        </div>
      </div>

      {/* Highlights */}
      {data.highlights && data.highlights.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Highlights</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {data.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Rich Content - Mix of Text and Images */}
      {data.content && data.content.length > 0 && (
        <div className="space-y-8">
          <h3 className="text-xl font-semibold mb-4">Trip Story</h3>
          
          {data.content.map((block, index) => {
            if (block.type === 'text') {
              return (
                <p key={index} className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                  {block.text}
                </p>
              );
            }
            
            if (block.type === 'image') {
              return (
                <div key={index} className="my-8">
                  <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src={block.url}
                      alt={block.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 900px"
                    />
                  </div>
                  {block.caption && (
                    <p className="text-gray-400 text-sm mt-3 italic text-center">
                      {block.caption}
                    </p>
                  )}
                </div>
              );
            }
            
            return null;
          })}
        </div>
      )}
    </div>
  );
}