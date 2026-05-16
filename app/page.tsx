'use client';

import { useEffect, useState } from 'react';
import { nationalIdService, NationalIdApplication } from './services/nationalId.service';
import { deathCertificateService, DeathCertificate } from './services/deathCertificate.service';
import Link from 'next/link';

export default function Dashboard() {
  const [applications, setApplications] = useState<NationalIdApplication[]>([]);
  const [deathCerts, setDeathCerts] = useState<DeathCertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const [appsRes, deathsRes] = await Promise.all([
          nationalIdService.getAll(),
          deathCertificateService.getAll(),
        ]);
        
        setApplications(appsRes.data?.data || appsRes.data || []);
        setDeathCerts(deathsRes.data?.data || deathsRes.data || []);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.response?.data?.message || error.message || 'Failed to fetch data');
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

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-red-800 font-medium">Error loading dashboard</h3>
          <p className="text-red-600 text-sm mt-1">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-3 text-sm text-red-700 hover:text-red-900 underline"
          >
            Retry
          </button>
        </div>
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
        {/* Stats Cards */}
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

        {/* Quick Actions Section */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* National ID Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-blue-600">National ID Applications</h2>
                <p className="text-gray-600 mt-1">Manage all National ID applications</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{applications.length}</div>
                <div className="text-sm text-gray-500">Total Applications</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Pending:</span>
                <span className="font-semibold text-yellow-600">{applications.filter(a => a.status === 'PENDING').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Verified:</span>
                <span className="font-semibold text-green-600">{applications.filter(a => a.status === 'VERIFIED').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Approved:</span>
                <span className="font-semibold text-blue-600">{applications.filter(a => a.status === 'APPROVED').length}</span>
              </div>
              <div className="mt-4 flex space-x-3">
                <Link href="/national_id/new" className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  New Application
                </Link>
                <Link href="/application" className="flex-1 text-center border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition">
                  View All
                </Link>
              </div>
            </div>
          </div>

          {/* Death Certificate Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-red-600">Death Certificates</h2>
                <p className="text-gray-600 mt-1">Manage all death certificates</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{deathCerts.length}</div>
                <div className="text-sm text-gray-500">Total Reports</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Pending Registration:</span>
                <span className="font-semibold text-yellow-600">{deathCerts.filter(c => c.status === 'PENDING').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Registered:</span>
                <span className="font-semibold text-green-600">{deathCerts.filter(c => c.status === 'REGISTERED' || c.status === 'APPROVED').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Rejected:</span>
                <span className="font-semibold text-red-600">{deathCerts.filter(c => c.status === 'REJECTED').length}</span>
              </div>
              <div className="mt-4 flex space-x-3">
                <Link href="/death/new" className="flex-1 text-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                  Report Death
                </Link>
                <Link href="/death" className="flex-1 text-center border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-50 transition">
                  View All
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Applications Table */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent National ID Applications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">App #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.slice(0, 5).map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.applicationNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.firstName} {app.surname}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.residentialDistrict}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'VERIFIED' ? 'bg-green-100 text-green-800' :
                        app.status === 'APPROVED' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`font-semibold ${app.citizenshipScore >= 100 ? 'text-green-600' : 'text-red-600'}`}>
                        {app.citizenshipScore}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link href={`/application/${app.id}`} className="text-blue-600 hover:text-blue-900">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {applications.length > 5 && (
            <div className="px-6 py-4 border-t">
              <Link href="/application" className="text-blue-600 hover:text-blue-900 text-sm">
                View all {applications.length} applications →
              </Link>
            </div>
          )}
        </div>

        {/* Recent Death Certificates Table */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Death Certificates</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Death</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deathCerts.slice(0, 5).map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {cert.certificateNumber || cert.registrationNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cert.firstName} {cert.surname}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(cert.dateOfDeath).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        cert.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        cert.status === 'REGISTERED' || cert.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {cert.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link href={`/death/${cert.id}`} className="text-blue-600 hover:text-blue-900">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {deathCerts.length > 5 && (
            <div className="px-6 py-4 border-t">
              <Link href="/death" className="text-blue-600 hover:text-blue-900 text-sm">
                View all {deathCerts.length} death certificates →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}