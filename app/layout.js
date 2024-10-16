import localFont from 'next/font/local';
import { ThemeProvider } from 'next-themes';

import { Flex } from 'styled-system/jsx';
import './globals.css';
import { ThreeProvider } from './three-provider';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: 'NextJS React-Three-Fiber Starter',
  description: "Template for playing with R3F in Next",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute='class'>
          <Flex dir={'column'}>
            <Flex
              minH={'100vh'}
              w={'100vw'}
              direction={'column'}
              justify={'space-between'}
            >
              <ThreeProvider>
                {children}
              </ThreeProvider>
            </Flex>
          </Flex>
        </ThemeProvider>
      </body>
    </html>
  );
}
