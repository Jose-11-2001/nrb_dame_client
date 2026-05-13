// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { nationalIdService, NationalIdApplication } from './services/nationalId.service';
import { deathCertificateService, DeathCertificate } from './services/deathCertificate.service';
import Link from 'next/link';

export default function Dashboard() {
  const [applications, setApplications] = useState<NationalIdApplication[]>([]);
  const [deathCerts, setDeathCerts] = useState<DeathCertificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsRes, deathsRes] = await Promise.all([
          nationalIdService.getAll(),
          deathCertificateService.getAll(),
        ]);
        setApplications(appsRes.data.data);
        setDeathCerts(deathsRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Applications', value: applications.length, color: 'bg-blue-600' },
    { label: 'Pending Applications', value: applications.filter((a) => a.status === 'PENDING').length, color: 'bg-yellow-600' },
    { label: 'Verified Applications', value: applications.filter((a) => a.status === 'VERIFIED').length, color: 'bg-green-600' },
    { label: 'Death Reports', value: deathCerts.length, color: 'bg-red-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Link
            href="/national_id/new"
            className="bg-blue-600 text-white rounded-lg p-6 hover:bg-blue-700 transition"
          >
            <h3 className="text-lg font-medium">New National ID Application</h3>
            <p className="mt-2 text-sm text-blue-100">Apply for a new National ID card</p>
          </Link>
          
          <Link
            href="/death/new"
            className="bg-red-600 text-white rounded-lg p-6 hover:bg-red-700 transition"
          >
            <h3 className="text-lg font-medium">Report a Death</h3>
            <p className="mt-2 text-sm text-red-100">Register a death certificate</p>
          </Link>
        </div>

        {/* Recent Applications */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Applications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">App #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">District</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.slice(0, 5).map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.applicationNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.firstName} {app.surname}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.residentialDistrict}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'VERIFIED' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.citizenshipScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}