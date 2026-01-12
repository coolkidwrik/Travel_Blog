export default function Hero() {
  return (
    <section className="bg-linear-to-b from-blue-900 to-gray-900 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold mb-6">
          Welcome to My Travel Journey
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Join me as I explore the world, one adventure at a time. From bustling
          cities to serene landscapes, discover the stories behind each destination.
        </p>
        <a
          href="#globe"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Explore the Globe
        </a>
      </div>
    </section>
  );
}