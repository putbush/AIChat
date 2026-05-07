import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Providers } from './providers';
import './styles';

const inter = localFont({
  src: [
    {
      path: './fonts/Inter-V.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AIChat',
  description: 'AIChat - Чат для общения с ИИ',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body className={`${inter.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
