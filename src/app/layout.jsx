import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Insta Follback Checker',
  description: 'Check who dont following you back here',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" id="ui-theme">
      <body className={`${inter.className} bg-gradient-to-r from-blue-200 to-cyan-200 dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-700 px-5 md:px-20`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
