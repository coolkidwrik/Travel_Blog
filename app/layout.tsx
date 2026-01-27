import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import GlobeSection from '@/components/home/GlobeSection';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // Basic info
  title: {
    default: 'Travel Chronicles - Exploring the World',
    template: '%s | Travel Chronicles', // For pages that set their own title
  },
  description: 'Join me on my journey across the globe. Explore travel stories, photos, and experiences from countries around the world.',
  
  // Keywords
  keywords: [
    'travel blog',
    'world travel',
    'travel photography',
    'travel experiences',
    'travel stories',
    'backpacking',
    'adventure travel',
  ],

  // Author
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-site.vercel.app',
    siteName: 'Travel Chronicles',
    title: 'Travel Chronicles - Exploring the World',
    description: 'Join me on my journey across the globe. Explore travel stories, photos, and experiences from countries around the world.',
    images: [
      {
        url: '/images/og-image.jpg', // Create a default Open Graph image
        width: 1200,
        height: 630,
        alt: 'Travel Chronicles',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Chronicles - Exploring the World',
    description: 'Join me on my journey across the globe.',
    creator: '@yourtwitterhandle',
    images: ['/images/og-image.jpg'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification (add these after deploying)
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
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
