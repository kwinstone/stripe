import type { Metadata } from 'next';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir';
import { theme } from '@/lib/theme';
import '@mantine/core/styles.css';

export const metadata: Metadata = {
  title: 'Payment service',
  description:
    'This repo can be used as a template for using Mantine V7 in a Nextjs 14 project with TSS for styling.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript defaultColorScheme='dark' />
      </head>
      <body style={{ backgroundColor: 'var(--mantine-color-gray-3)'}}>
        <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
          <MantineProvider>
            {children}
          </MantineProvider>
        </NextAppDirEmotionCacheProvider>
      </body>
    </html>
  );
}
