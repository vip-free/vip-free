import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'NYEXSOBATEN',
  description: 'URL Shortener App',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
