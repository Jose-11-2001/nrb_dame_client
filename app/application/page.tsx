// app/applications/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { nationalIdService, NationalIdApplication } from '../services/nationalId.service';
import Link from 'next/link';

export default function ApplicationsList() {
  const [applications, setApplications] = useState<NationalIdApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

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

  const handleVerify = async (id: string) => {
    const villageHeadIdNo = prompt('Enter Village Head ID Number:');
    if (!villageHeadIdNo) return;
    
    const signature = prompt('Enter Signature:');
    if (!signature) return;
    
    setVerifying(id);
    try {
      await nationalIdService.verifyByVillageHead(id, villageHeadIdNo, signature);
      alert('Application verified successfully!');
      await fetchApplications(); // Refresh the list
    } catch (error: any) {
      alert(error.response?.data?.message || 'Verification failed');
    } finally {
      setVerifying(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      VERIFIED: 'bg-green-100 text-green-800',
      APPROVED: 'bg-blue-100 text-blue-800',
      REJECTED: 'bg-red-100 text-red-800',
      COMPLETED: 'bg-purple-100 text-purple-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b flex justify-between items-center">
          <h1 className="text-2xl font-bold">National ID Applications</h1>
          <button
            onClick={() => fetchApplications()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Refresh
          </button>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{app.applicationNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{app.firstName} {app.surname}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(app.dateOfBirth).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{app.residentialDistrict}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`font-semibold ${app.citizenshipScore >= 100 ? 'text-green-600' : 'text-red-600'}`}>
                      {app.citizenshipScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <Link
                      href={`/applications/${app.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </Link>
                    {app.status === 'PENDING' && (
                      <button
                        onClick={() => handleVerify(app.id)}
                        disabled={verifying === app.id}
                        className="text-green-600 hover:text-green-900 ml-2 disabled:opacity-50"
                      >
                        {verifying === app.id ? 'Verifying...' : 'Verify'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}