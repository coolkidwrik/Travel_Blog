import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import GlobeSection from '@/components/home/GlobeSection';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Travel Chronicles - Exploring the World',
  description: 'My personal travel blog showcasing adventures across the globe',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        
        {/* These components persist across all pages */}
        <Hero />
        <GlobeSection />
        
        {/* Page-specific content renders here */}
        <main>{children}</main>
        
        <Footer />
      </body>
    </html>
  );
}
