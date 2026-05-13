// app/applications/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { nationalIdService } from '../services/nationalId.service';
import Link from 'next/link';

export default function ApplicationsList() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await nationalIdService.getAll();
        setApplications(response.data.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b">
          <h1 className="text-2xl font-bold">National ID Applications</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">App #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">DOB</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">District</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app: any) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{app.applicationNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{app.firstName} {app.surname}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(app.dateOfBirth).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{app.residentialDistrict}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'VERIFIED' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{app.citizenshipScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}