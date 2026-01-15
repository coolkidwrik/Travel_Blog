import Link from 'next/link';

type UnderConstructionProps = {
  countryCode: string;
};

export default function UnderConstruction({ countryCode }: UnderConstructionProps) {
  return (
    <section className="py-20 bg-linear-to-t from-[#000726] via-black via-80% to-black min-h-screen flex flex-col items-center justify-center text-center">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <span className="text-8xl">🚧</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          Under Construction
        </h1>
        <p className="text-gray-400 text-lg mb-4 max-w-2xl mx-auto">
          I've been to this amazing country, but I'm still working on organizing 
          my photos and stories.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Country Code: {countryCode.toUpperCase()}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/#globe"
            className="inline-block bg-[#02a5c5] hover:bg-[#7b00ff] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
          >
            Back to Globe
          </Link>
        </div>
      </div>
    </section>
  );
}
