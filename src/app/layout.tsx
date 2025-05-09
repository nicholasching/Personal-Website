import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import { ThemeProviderClient } from './providers/ThemeProvider';
import { ThemeWrapper } from './components/ThemeWrapper';
import { AnalyticsWrapper } from './components/AnalyticsWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nicholas Ching',
  description: `Nicholas Ching's portfolio website showcasing my experience and projects`,
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
            <AnalyticsWrapper>
              <Navbar />
              <main className="pt-16">
                {children}
              </main>
            </AnalyticsWrapper>
          </ThemeWrapper>
        </ThemeProviderClient>
      </body>
    </html>
  );
}
