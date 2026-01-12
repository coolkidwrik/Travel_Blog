import Image from 'next/image';

type GalleryData = {
  images: Array<{
    url: string;
    caption: string;
    alt: string;
  }>;
};

type GalleryContentProps = {
  data: GalleryData;
};

export default function GalleryContent({ data }: GalleryContentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.images.map((image, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="relative aspect-4/3 overflow-hidden">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform group-hover:scale-110"
            />
          </div>
          <div className="p-4">
            <p className="text-gray-300 text-sm">{image.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}