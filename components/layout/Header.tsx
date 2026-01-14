import SmoothScrollLink from './SmoothScrollLink';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-3 sm:py-4 flex justify-center sm:justify-end items-center bg-transparent text-white backdrop-blur-sm">
      <nav className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-8 text-base sm:text-lg font-medium">
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