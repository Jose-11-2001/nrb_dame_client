// app/death-certificates/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deathCertificateService, DeathCertificate } from '../services/deathCertificate.service';

export default function DeathCertificates() {
  const router = useRouter();
  const [searchType, setSearchType] = useState<'id' | 'registration' | 'name'>('id');
  const [searchValue, setSearchValue] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [results, setResults] = useState<DeathCertificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<DeathCertificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      let response;
      if (searchType === 'id') {
        response = await deathCertificateService.searchByIdNumber(searchValue);
        setResults(response.data.data);
      } else if (searchType === 'registration') {
        response = await deathCertificateService.searchByRegistrationNumber(searchValue);
        setResults(response.data.data ? [response.data.data] : []);
      } else if (searchType === 'name') {
        response = await deathCertificateService.searchByName(firstName, surname);
        setResults(response.data.data);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id: string) => {
    const signature = prompt('Enter District Registrar Signature:');
    if (!signature) return;
    
    setVerifying(true);
    try {
      const response = await deathCertificateService.register(id, signature);
      if (response.data.success) {
        alert('Death certificate registered successfully!');
        handleSearch(); // Refresh search results
        setSelectedCert(null);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Verification failed');
    } finally {
      setVerifying(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      REGISTERED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-bold">Death Certificate Management</h1>
          <p className="text-gray-600 mt-1">Search, view, and verify death certificates</p>
        </div>

        {/* Search Section */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold mb-4">Search Death Records</h2>
          
          {/* Search Type Selector */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setSearchType('id')}
              className={`px-4 py-2 rounded-md ${
                searchType === 'id' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Search by ID Number
            </button>
            <button
              onClick={() => setSearchType('registration')}
              className={`px-4 py-2 rounded-md ${
                searchType === 'registration' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Search by Certificate #
            </button>
            <button
              onClick={() => setSearchType('name')}
              className={`px-4 py-2 rounded-md ${
                searchType === 'name' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Search by Name
            </button>
          </div>

          {/* Search Inputs */}
          <div className="space-y-4">
            {searchType === 'id' && (
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter National ID Number (e.g., 1234567890)"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="flex-1 border rounded-md p-2"
                />
                <button
                  onClick={handleSearch}
                  disabled={!searchValue || loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            )}

            {searchType === 'registration' && (
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter Death Certificate Number (e.g., DTH/2026/XXXXX)"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="flex-1 border rounded-md p-2"
                />
                <button
                  onClick={handleSearch}
                  disabled={!searchValue || loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            )}

            {searchType === 'name' && (
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="flex-1 border rounded-md p-2"
                />
                <input
                  type="text"
                  placeholder="Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="flex-1 border rounded-md p-2"
                />
                <button
                  onClick={handleSearch}
                  disabled={!firstName || !surname || loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4">Search Results ({results.length})</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reg #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date of Death</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((cert) => (
                    <tr key={cert.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedCert(cert)}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{cert.registrationNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{cert.firstName} {cert.surname}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(cert.dateOfDeath).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(cert.status)}`}>
                          {cert.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCert(cert);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          View Details
                        </button>
                        {cert.status === 'PENDING' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVerify(cert.id);
                            }}
                            disabled={verifying}
                            className="text-green-600 hover:text-green-900 disabled:opacity-50"
                          >
                            {verifying ? 'Verifying...' : 'Register'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {results.length === 0 && searchValue && !loading && (
          <div className="p-6 text-center text-gray-500">
            No death records found. Try a different search term.
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Death Certificate Details</h2>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Status Banner */}
              <div className={`p-4 rounded-lg ${
                selectedCert.status === 'REGISTERED' ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
              }`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Registration Status</h3>
                    <p className="text-sm mt-1">
                      {selectedCert.status === 'REGISTERED' 
                        ? '✓ This death has been officially registered'
                        : '⏳ This death certificate requires official registration'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(selectedCert.status)}`}>
                      {selectedCert.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deceased Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Deceased Information</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="text-sm text-gray-500">Full Name</label>
                    <p className="font-medium">{selectedCert.firstName} {selectedCert.surname}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Registration Number</label>
                    <p className="font-medium">{selectedCert.registrationNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Date of Birth</label>
                    <p className="font-medium">{new Date(selectedCert.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Date of Death</label>
                    <p className="font-medium">{new Date(selectedCert.dateOfDeath).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Gender</label>
                    <p className="font-medium">{selectedCert.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Nationality</label>
                    <p className="font-medium">{selectedCert.nationality}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Place of Death</label>
                    <p className="font-medium">{selectedCert.placeOfDeath}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Manner of Death</label>
                    <p className="font-medium">{selectedCert.mannerOfDeath}</p>
                  </div>
                </div>
              </div>

              {/* Parents Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Parents Information</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="text-sm text-gray-500">Mother's Name</label>
                    <p className="font-medium">{selectedCert.motherFirstName} {selectedCert.motherSurname}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Mother's Nationality</label>
                    <p className="font-medium">{selectedCert.motherNationality}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Father's Name</label>
                    <p className="font-medium">{selectedCert.fatherFirstName} {selectedCert.fatherSurname}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Father's Nationality</label>
                    <p className="font-medium">{selectedCert.fatherNationality}</p>
                  </div>
                </div>
              </div>

              {/* Informant Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Informant Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Informant Name</label>
                      <p className="font-medium">{selectedCert.informantFirstName} {selectedCert.informantSurname}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">ID Number</label>
                      <p className="font-medium">{selectedCert.informantIdNo}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Relationship</label>
                      <p className="font-medium">{selectedCert.informantRelationship}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Address</label>
                      <p className="font-medium">{selectedCert.informantAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Register Button for Pending Certificates */}
              {selectedCert.status === 'PENDING' && (
                <div className="flex justify-end pt-4 border-t">
                  <button
                    onClick={() => handleVerify(selectedCert.id)}
                    disabled={verifying}
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {verifying ? 'Registering...' : 'Register Death Certificate'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}