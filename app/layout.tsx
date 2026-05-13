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
                
                {/* Desktop Navigation with Dropdowns */}
                <div className="hidden md:flex ml-10 space-x-4">
                  <Link href="/" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md">
                    Dashboard
                  </Link>
                  
                  {/* National ID Dropdown */}
                  <div className="relative group">
                    <button className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md inline-flex items-center">
                      National ID
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md w-48 z-10">
                      <Link href="/national_id/new" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        New Application
                      </Link>
                      <Link href="/national-id-applications" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        View All Applications
                      </Link>
                    </div>
                  </div>

                  {/* Death Certificate Dropdown */}
                  <div className="relative group">
                    <button className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md inline-flex items-center">
                      Death Certificate
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md w-48 z-10">
                      <Link href="/death/new" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Report Death
                      </Link>
                      <Link href="/death-certificates-list" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        View All Certificates
                      </Link>
                      <Link href="/death-certificates" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Search Records
                      </Link>
                    </div>
                  </div>
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