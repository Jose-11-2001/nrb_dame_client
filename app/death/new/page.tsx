// app/death-certificate/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deathCertificateService } from '../../services/deathCertificate.service';

export default function NewDeathCertificate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    surname: '',
    firstName: '',
    otherNames: '',
    nationality: 'Malawi',
    gender: 'MALE',
    dateOfBirth: '',
    dateOfDeath: '',
    placeOfDeath: 'HEALTH_FACILITY',
    healthFacilityName: '',
    mannerOfDeath: 'NATURAL',
    residentialDistrict: '',
    residentialTA: '',
    residentialVillage: '',
    motherSurname: '',
    motherFirstName: '',
    motherNationality: 'Malawi',
    fatherSurname: '',
    fatherFirstName: '',
    fatherNationality: 'Malawi',
    informantSurname: '',
    informantFirstName: '',
    informantIdNo: '',
    informantRelationship: '',
    informantAddress: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await deathCertificateService.create(formData);
      if (response.data.success) {
        alert('Death certificate submitted successfully!');
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
        <h1 className="text-2xl font-bold mb-6">Death Certificate Application</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">Deceased Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label className="block text-sm font-medium">Date of Death *</label>
                <input
                  type="date"
                  name="dateOfDeath"
                  value={formData.dateOfDeath}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-md disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Death Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}