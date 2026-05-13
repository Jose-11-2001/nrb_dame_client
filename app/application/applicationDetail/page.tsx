'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { nationalIdService, NationalIdApplication } from '../../services/nationalId.service';

export default function ApplicationDetail() {
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
      await fetchApplication();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Verification failed');
    } finally {
      setVerifying(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!application) return <div className="text-center py-10">Application not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Application Details</h1>
            <p className="text-gray-600">#{application.applicationNumber}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Back
            </button>
            {application.status === 'PENDING' && (
              <button
                onClick={handleVerify}
                disabled={verifying}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {verifying ? 'Verifying...' : 'Verify Application'}
              </button>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Banner */}
          <div className={`p-4 rounded-lg ${
            application.status === 'VERIFIED' ? 'bg-green-50 border border-green-200' :
            application.status === 'PENDING' ? 'bg-yellow-50 border border-yellow-200' :
            'bg-gray-50 border border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Current Status</h3>
                <p className="text-sm mt-1">
                  {application.status === 'VERIFIED' 
                    ? '✓ This application has been verified and is ready for processing'
                    : application.status === 'PENDING'
                    ? '⏳ This application requires village head verification'
                    : application.status}
                </p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  application.status === 'VERIFIED' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                }`}>
                  {application.status}
                </span>
                <p className="text-xs mt-1">Score: {application.citizenshipScore}/100</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <p className="font-medium">{application.firstName} {application.surname}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Date of Birth</label>
                <p className="font-medium">{new Date(application.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Gender</label>
                <p className="font-medium">{application.gender}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Marital Status</label>
                <p className="font-medium">{application.maritalStatus}</p>
              </div>
            </div>
          </div>

          {/* Verification Instructions */}
          {application.status === 'PENDING' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900">How to Verify:</h3>
              <ol className="mt-2 text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Click the "Verify Application" button above</li>
                <li>Enter the Village Head's ID Number</li>
                <li>Enter the Village Head's Signature</li>
                <li>The application will be verified automatically if all criteria are met</li>
              </ol>
            </div>
          )}

          {/* Score Breakdown */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Citizenship Score</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span>Total Score:</span>
                <span className={`font-bold text-lg ${application.citizenshipScore >= 100 ? 'text-green-600' : 'text-red-600'}`}>
                  {application.citizenshipScore}/100
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${application.citizenshipScore >= 100 ? 'bg-green-600' : 'bg-yellow-600'}`}
                  style={{ width: `${Math.min(application.citizenshipScore, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {application.citizenshipScore >= 100 
                  ? '✓ Eligible for National ID (Score meets requirement)'
                  : '✗ Not yet eligible (Need 100+ points)'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}