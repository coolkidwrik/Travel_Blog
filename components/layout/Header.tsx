import SmoothScrollLink from './SmoothScrollLink';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center sm:justify-between gap-3 sm:gap-0 bg-transparent text-white backdrop-blur-sm">
      <SmoothScrollLink href="/" targetId="hero">
        <span className="text-lg sm:text-xl font-semibold tracking-tight whitespace-nowrap text-center sm:text-left">
          CKWrik&rsquo;s <span className="text-[#2ad473]">Travel Blog</span>
        </span>
      </SmoothScrollLink>
      <nav className="flex flex-wrap justify-center sm:justify-end gap-6 sm:gap-20 text-base sm:text-lg font-medium">
        <SmoothScrollLink href="/" targetId="hero">
          Home
        </SmoothScrollLink>
        <SmoothScrollLink href="/" targetId="about">
          About
        </SmoothScrollLink>
        <SmoothScrollLink href="/" targetId="globe">
          Explore
        </SmoothScrollLink>
      </nav>
    </header>
  );
}