import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { ThemeProvider } from '@/lib/theme';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXTAUTH_URL || 'https://shuyi-numerology.vercel.app'
  ),
  title: {
    default: 'Shuyi — Numerology & Tarot Exploration',
    template: '%s | Shuyi',
  },
  description:
    'Harmonizing ancient Pythagorean mathematics with reflective tarot symbolism and timeless editorial design. Explore Life Paths, Destiny Expression, and archetypal frequencies.',
  keywords: [
    'numerology',
    'tarot',
    'life path calculator',
    'pythagorean numerology',
    'archetypes',
    'destiny number',
    'soul urge',
  ],
  authors: [{ name: 'Kaushikrudra', url: 'https://github.com/Kaushikrudra' }],
  openGraph: {
    title: 'Shuyi — Numerology & Tarot Exploration',
    description:
      'Harmonizing ancient Pythagorean mathematics with reflective tarot symbolism and timeless editorial design.',
    url: '/',
    siteName: 'Shuyi',
    images: [
      {
        url: '/hero-poster.webp',
        width: 1200,
        height: 630,
        alt: 'Shuyi Celestial Astrolabe & Sacred Numerology',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shuyi — Numerology & Tarot Exploration',
    description:
      'Harmonizing ancient Pythagorean mathematics with reflective tarot symbolism and timeless editorial design.',
    images: ['/hero-poster.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/files/favicon.ico', sizes: 'any' },
      { url: '/files/favicon.svg', type: 'image/svg+xml' },
      { url: '/files/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/files/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/files/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/files/favicon-180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${cormorant.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('theme-preference');
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && systemDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-background text-foreground flex flex-col min-h-screen font-sans antialiased">
        <AuthProvider>
          <ThemeProvider>
            <Header />
            <main className="flex-1 w-full animate-page-enter">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
