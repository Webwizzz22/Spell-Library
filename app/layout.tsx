import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '../src/index.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SpellAcademia - Master the Art of Magic',
  description: 'Learn spells, discover magical creatures, and embark on your journey through the wizarding world',
  keywords: ['magic', 'spells', 'learning', 'Harry Potter', 'education', 'fantasy'],
  authors: [{ name: 'SpellAcademia Team' }],
  openGraph: {
    title: 'SpellAcademia - Master the Art of Magic',
    description: 'Learn spells, discover magical creatures, and embark on your journey through the wizarding world',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
          <div id="root">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}