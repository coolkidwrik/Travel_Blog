import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="py-20 bg-linear-to-t from-[#000726] via-black via-80% to-black min-h-screen flex flex-col items-center justify-center text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-300 mb-6">
          Country Not Found
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Looks like this destination hasn't been explored yet. 
          Return to the globe and select a country I've visited!
        </p>
        <Link
          href="/#globe"
          className="inline-block bg-[#02a5c5] hover:bg-[#7b00ff] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
        >
          Back to Globe
        </Link>
      </div>
    </section>
  );
}
