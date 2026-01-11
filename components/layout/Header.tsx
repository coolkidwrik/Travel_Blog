import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <p className="mt-2">Under Construction</p>
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link href="/#globe" className="hover:text-gray-300 transition">
            Explore
          </Link>
          <Link href="/about" className="hover:text-gray-300 transition">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}