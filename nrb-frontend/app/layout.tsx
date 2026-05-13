// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NRB Registration System',
  description: 'Malawi National Registration Bureau',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold text-blue-600">
                  NRB System
                </Link>
                <div className="hidden md:flex ml-10 space-x-4">
                  <Link href="/" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                    Dashboard
                  </Link>
                  <Link href="/national-id/new" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                    New National ID
                  </Link>
                  <Link href="/death-certificate/new" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                    Report Death
                  </Link>
                  <Link href="/applications" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                    Applications
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gray-50">{children}</main>
      </body>
    </html>
  );
}