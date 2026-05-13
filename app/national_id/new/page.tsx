// app/national-id/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { nationalIdService } from '../../services/nationalId.service';

export default function NewNationalId() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    nationality: 'Malawi',
    dateOfBirth: '',
    gender: 'MALE',
    districtOfBirth: '',
    taOfBirth: '',
    villageOfBirth: '',
    maritalStatus: 'MARRIED',
    residentialDistrict: '',
    residentialTA: '',
    residentialVillage: '',
    permanentDistrict: '',
    permanentTA: '',
    permanentVillage: '',
    motherFullName: '',
    motherNationality: 'Malawi',
    motherDistrict: '',
    motherTA: '',
    motherVillage: '',
    fatherFullName: '',
    fatherNationality: 'Malawi',
    fatherDistrict: '',
    fatherTA: '',
    fatherVillage: '',
    firstWitnessIdNo: '',
    secondWitnessIdNo: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate witness IDs before submitting
    if (formData.firstWitnessIdNo.length < 10) {
      alert('First witness ID must be at least 10 characters');
      return;
    }
    if (formData.secondWitnessIdNo.length < 10) {
      alert('Second witness ID must be at least 10 characters');
      return;
    }
    
    setLoading(true);
    try {
      const response = await nationalIdService.create(formData);
      if (response.data.success) {
        alert('Application submitted successfully!');
        router.push('/');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">National ID Application</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Details */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">First Name *</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Surname *</label>
                <input
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Marital Status *</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                >
                  <option value="MARRIED">Married</option>
                  <option value="SINGLE">Single</option>
                  <option value="DIVORCED">Divorced</option>
                  <option value="WIDOWED">Widowed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Place of Birth */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">Place of Birth</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium">District *</label>
                <input
                  name="districtOfBirth"
                  value={formData.districtOfBirth}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Traditional Authority (TA) *</label>
                <input
                  name="taOfBirth"
                  value={formData.taOfBirth}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Village *</label>
                <input
                  name="villageOfBirth"
                  value={formData.villageOfBirth}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
            </div>
          </div>

          {/* Residential Address */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">Residential Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium">District *</label>
                <input
                  name="residentialDistrict"
                  value={formData.residentialDistrict}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Traditional Authority (TA) *</label>
                <input
                  name="residentialTA"
                  value={formData.residentialTA}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Village *</label>
                <input
                  name="residentialVillage"
                  value={formData.residentialVillage}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
            </div>
          </div>

          {/* Permanent Address */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">Permanent Home Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium">District *</label>
                <input
                  name="permanentDistrict"
                  value={formData.permanentDistrict}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Traditional Authority (TA) *</label>
                <input
                  name="permanentTA"
                  value={formData.permanentTA}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Village *</label>
                <input
                  name="permanentVillage"
                  value={formData.permanentVillage}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
            </div>
          </div>

          {/* Parents Information */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">Mother's Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium">Full Name *</label>
                <input
                  name="motherFullName"
                  value={formData.motherFullName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">District *</label>
                <input
                  name="motherDistrict"
                  value={formData.motherDistrict}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">TA *</label>
                <input
                  name="motherTA"
                  value={formData.motherTA}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Village *</label>
                <input
                  name="motherVillage"
                  value={formData.motherVillage}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-4 mb-4">Father's Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium">Full Name *</label>
                <input
                  name="fatherFullName"
                  value={formData.fatherFullName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">District *</label>
                <input
                  name="fatherDistrict"
                  value={formData.fatherDistrict}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">TA *</label>
                <input
                  name="fatherTA"
                  value={formData.fatherTA}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Village *</label>
                <input
                  name="fatherVillage"
                  value={formData.fatherVillage}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
            </div>
          </div>

          {/* Witness Information - IMPORTANT: Add this section */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">Witness Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">First Witness ID Number * (min 10 characters)</label>
                <input
                  name="firstWitnessIdNo"
                  value={formData.firstWitnessIdNo}
                  onChange={handleChange}
                  required
                  placeholder="e.g., MW1234567890"
                  className="mt-1 block w-full border rounded-md p-2"
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 10 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium">Second Witness ID Number * (min 10 characters)</label>
                <input
                  name="secondWitnessIdNo"
                  value={formData.secondWitnessIdNo}
                  onChange={handleChange}
                  required
                  placeholder="e.g., MW0987654321"
                  className="mt-1 block w-full border rounded-md p-2"
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 10 characters</p>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}