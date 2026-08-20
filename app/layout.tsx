import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import '../styles/globals.css';
import { ThemeProvider } from '@/lib/theme';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shuyi - Tarot & Numerology Preview',
  description: 'Personal portfolio project featuring tarot and numerology preview tools.',
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
        <ThemeProvider>
          <Header />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
