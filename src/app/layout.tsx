import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import { ThemeProviderClient } from './providers/ThemeProvider';
import { ThemeWrapper } from './components/ThemeWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Portfolio',
  description: 'My personal portfolio website showcasing my experience and projects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProviderClient>
          <ThemeWrapper>
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
          </ThemeWrapper>
        </ThemeProviderClient>
      </body>
    </html>
  );
}
