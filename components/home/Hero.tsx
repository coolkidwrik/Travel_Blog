import Image from 'next/image';

export default function Hero() {
  return (
    <section id="hero" className="relative pt-60 pb-24 text-white overflow-hidden min-h-screen">
      {/* Background Image */}
      <Image
        src="/images/pyramid_lake_h.webp"
        alt="Hero background"
        fill
        className="object-cover"
        priority
        quality={75}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/5 to-black"></div>

      {/* Blur overlay */} {/* I'm on the fence about using this */}
      {/* <div className="absolute inset-0 backdrop-blur-[2px]"></div> */}
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          C.K.Wrik's Travel Blog
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Join me on my journey to places all over the globe
        </p>
        {/* <a
          href="#globe"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Explore the Globe
        </a> */}
      </div>
    </section>
  );
}