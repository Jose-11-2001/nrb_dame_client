'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { deathCertificateService, DeathCertificate } from '../../services/deathCertificate.service';
import { DownloadPDFButton } from '../../components/PDFGenerator';
import Link from 'next/link';

export default function DeathCertificateDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [certificate, setCertificate] = useState<DeathCertificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    fetchCertificate();
  }, [id]);

  const fetchCertificate = async () => {
    try {
      const response = await deathCertificateService.getOne(id as string);
      setCertificate(response.data.data);
    } catch (error) {
      console.error('Error fetching certificate:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    const signature = prompt('Enter District Registrar Signature:');
    if (!signature) return;
    
    setVerifying(true);
    try {
      const response = await deathCertificateService.register(id as string, signature);
      if (response.data.success) {
        alert('Death certificate registered successfully!');
        fetchCertificate();
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Verification failed');
    } finally {
      setVerifying(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: { [key: string]: string } = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      REGISTERED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading death certificate details...</div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Certificate Not Found</h1>
          <p className="text-gray-600 mb-4">The death certificate you're looking for doesn't exist.</p>
          <Link href="/death-certificates-list" className="text-blue-600 hover:text-blue-900">
            ← Back to Death Certificates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Death Certificate</h1>
              <p className="text-red-100 mt-1">Registration #{certificate.registrationNumber}</p>
            </div>
            <div className="flex space-x-2">
              <DownloadPDFButton type="death" data={certificate} label="Download PDF" />
              <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-white text-red-600 rounded-md hover:bg-gray-100 transition"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Banner */}
          <div className={`p-4 rounded-lg ${
            certificate.status === 'REGISTERED' ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Registration Status</h3>
                <p className="text-sm mt-1">
                  {certificate.status === 'REGISTERED' 
                    ? '✓ This death has been officially registered'
                    : '⏳ This death certificate requires official registration'}
                </p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(certificate.status)}`}>
                  {certificate.status}
                </span>
              </div>
            </div>
          </div>

          {/* Deceased Information */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 border-b pb-2">Deceased Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <p className="font-medium text-gray-900">{certificate.firstName} {certificate.surname}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Other Names</label>
                <p className="font-medium text-gray-900">{certificate.otherNames || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Date of Birth</label>
                <p className="font-medium text-gray-900">{new Date(certificate.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Date of Death</label>
                <p className="font-medium text-gray-900">{new Date(certificate.dateOfDeath).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Gender</label>
                <p className="font-medium text-gray-900">{certificate.gender}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Nationality</label>
                <p className="font-medium text-gray-900">{certificate.nationality}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Place of Death</label>
                <p className="font-medium text-gray-900">{certificate.placeOfDeath}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Health Facility</label>
                <p className="font-medium text-gray-900">{certificate.healthFacilityName || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Manner of Death</label>
                <p className="font-medium text-gray-900">{certificate.mannerOfDeath}</p>
              </div>
            </div>
          </div>

          {/* Parents Information */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 border-b pb-2">Parents Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <label className="text-sm text-gray-500">Mother's Name</label>
                <p className="font-medium text-gray-900">{certificate.motherFirstName} {certificate.motherSurname}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Mother's Nationality</label>
                <p className="font-medium text-gray-900">{certificate.motherNationality}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Father's Name</label>
                <p className="font-medium text-gray-900">{certificate.fatherFirstName} {certificate.fatherSurname}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Father's Nationality</label>
                <p className="font-medium text-gray-900">{certificate.fatherNationality}</p>
              </div>
            </div>
          </div>

          {/* Informant Information */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 border-b pb-2">Informant Information</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Informant Name</label>
                  <p className="font-medium text-gray-900">{certificate.informantFirstName} {certificate.informantSurname}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">ID Number</label>
                  <p className="font-medium text-gray-900">{certificate.informantIdNo}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Relationship</label>
                  <p className="font-medium text-gray-900">{certificate.informantRelationship}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Address</label>
                  <p className="font-medium text-gray-900">{certificate.informantAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Residential Address */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 border-b pb-2">Residential Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <label className="text-sm text-gray-500">District</label>
                <p className="font-medium text-gray-900">{certificate.residentialDistrict}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Traditional Authority</label>
                <p className="font-medium text-gray-900">{certificate.residentialTA}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Village</label>
                <p className="font-medium text-gray-900">{certificate.residentialVillage}</p>
              </div>
            </div>
          </div>

          {/* Registration Details (if registered) */}
          {certificate.status === 'REGISTERED' && (
            <div>
              <h2 className="text-lg font-semibold mb-3 text-gray-900 border-b pb-2">Registration Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-green-50 p-4 rounded-lg">
                <div>
                  <label className="text-sm text-gray-500">Date of Registration</label>
                  <p className="font-medium text-gray-900">
                    {certificate.dateOfRegistration ? new Date(certificate.dateOfRegistration).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Registered By</label>
                  <p className="font-medium text-gray-900">{certificate.districtRegistrarSignature || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Register Button for Pending Certificates */}
          {certificate.status === 'PENDING' && (
            <div className="flex justify-end pt-4 border-t">
              <button
                onClick={handleVerify}
                disabled={verifying}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition"
              >
                {verifying ? 'Registering...' : 'Register Death Certificate'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}