'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { nationalIdService, NationalIdApplication } from '../../services/nationalId.service';
import { DownloadPDFButton } from '../../components/PDFGenerator';
import Link from 'next/link';

export default function NationalIdDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<NationalIdApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      const response = await nationalIdService.getOne(id as string);
      setApplication(response.data.data);
    } catch (error) {
      console.error('Error fetching application:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    const villageHeadIdNo = prompt('Enter Village Head ID Number:');
    if (!villageHeadIdNo) return;
    
    const signature = prompt('Enter Signature:');
    if (!signature) return;
    
    setVerifying(true);
    try {
      await nationalIdService.verifyByVillageHead(id as string, villageHeadIdNo, signature);
      alert('Application verified successfully!');
      fetchApplication();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Verification failed');
    } finally {
      setVerifying(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: { [key: string]: string } = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      VERIFIED: 'bg-green-100 text-green-800',
      APPROVED: 'bg-blue-100 text-blue-800',
      REJECTED: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading application details...</div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Application Not Found</h1>
          <p className="text-gray-600 mb-4">The application you're looking for doesn't exist.</p>
          <Link href="/national-id-applications" className="text-blue-600 hover:text-blue-900">
            ← Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">National ID Application</h1>
              <p className="text-blue-100 mt-1">Application #{application.applicationNumber}</p>
            </div>
            <div className="flex space-x-2">
              <DownloadPDFButton type="national" data={application} label="Download PDF" />
              <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Banner */}
          <div className={`p-4 rounded-lg ${
            application.status === 'VERIFIED' ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Application Status</h3>
                <p className="text-sm mt-1">
                  {application.status === 'VERIFIED' 
                    ? '✓ This application has been verified'
                    : '⏳ This application requires village head verification'}
                </p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(application.status)}`}>
                  {application.status}
                </span>
                <p className="text-xs mt-1">Score: {application.citizenshipScore}/100</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 border-b pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <p className="font-medium text-gray-900">{application.firstName} {application.surname}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Other Names</label>
                <p className="font-medium text-gray-900">{application.otherNames || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Date of Birth</label>
                <p className="font-medium text-gray-900">{new Date(application.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Gender</label>
                <p className="font-medium text-gray-900">{application.gender}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Marital Status</label>
                <p className="font-medium text-gray-900">{application.maritalStatus}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Nationality</label>
                <p className="font-medium text-gray-900">{application.nationality}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">District of Birth</label>
                <p className="font-medium text-gray-900">{application.districtOfBirth}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Traditional Authority</label>
                <p className="font-medium text-gray-900">{application.taOfBirth}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Village</label>
                <p className="font-medium text-gray-900">{application.villageOfBirth}</p>
              </div>
            </div>
          </div>

          {/* Parents Information */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 border-b pb-2">Parents Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <label className="text-sm text-gray-500">Mother's Name</label>
                <p className="font-medium text-gray-900">{application.motherFullName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Mother's Nationality</label>
                <p className="font-medium text-gray-900">{application.motherNationality}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Father's Name</label>
                <p className="font-medium text-gray-900">{application.fatherFullName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Father's Nationality</label>
                <p className="font-medium text-gray-900">{application.fatherNationality}</p>
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 border-b pb-2">Address Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <label className="text-sm text-gray-500">Residential District</label>
                <p className="font-medium text-gray-900">{application.residentialDistrict}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Residential TA</label>
                <p className="font-medium text-gray-900">{application.residentialTA}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Residential Village</label>
                <p className="font-medium text-gray-900">{application.residentialVillage}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Permanent District</label>
                <p className="font-medium text-gray-900">{application.permanentDistrict}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Permanent TA</label>
                <p className="font-medium text-gray-900">{application.permanentTA}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Permanent Village</label>
                <p className="font-medium text-gray-900">{application.permanentVillage}</p>
              </div>
            </div>
          </div>

          {/* Witness Information */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 border-b pb-2">Witness Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <label className="text-sm text-gray-500">First Witness ID</label>
                <p className="font-medium text-gray-900">{application.firstWitnessIdNo}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Second Witness ID</label>
                <p className="font-medium text-gray-900">{application.secondWitnessIdNo}</p>
              </div>
            </div>
          </div>

          {/* Verification Details (if verified) */}
          {application.status === 'VERIFIED' && (
            <div>
              <h2 className="text-lg font-semibold mb-3 text-gray-900 border-b pb-2">Verification Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-green-50 p-4 rounded-lg">
                <div>
                  <label className="text-sm text-gray-500">Verified By (Village Head ID)</label>
                  <p className="font-medium text-gray-900">{application.villageHeadIdNo || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Verification Date</label>
                  <p className="font-medium text-gray-900">{application.updatedAt ? new Date(application.updatedAt).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Register Button for Pending Applications */}
          {application.status === 'PENDING' && (
            <div className="flex justify-end pt-4 border-t">
              <button
                onClick={handleVerify}
                disabled={verifying}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition"
              >
                {verifying ? 'Verifying...' : 'Verify Application'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}