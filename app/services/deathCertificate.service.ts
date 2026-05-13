// services/deathCertificate.service.ts
import axios from '../lib/axios';

export interface DeathCertificate {
  id: string;
  registrationNumber: string;
  surname: string;
  firstName: string;
  otherNames?: string;
  nationality: string;
  gender: 'MALE' | 'FEMALE';
  dateOfBirth: string;
  dateOfDeath: string;
  placeOfDeath: string;
  healthFacilityName?: string;
  mannerOfDeath: string;
  residentialDistrict: string;
  residentialTA: string;
  residentialVillage: string;
  motherSurname: string;
  motherFirstName: string;
  motherNationality: string;
  fatherSurname: string;
  fatherFirstName: string;
  fatherNationality: string;
  informantSurname: string;
  informantFirstName: string;
  informantIdNo: string;
  informantRelationship: string;
  informantAddress: string;
  status: string;
  createdAt: string;
}

export const deathCertificateService = {
  getAll: () => axios.get<{ success: boolean; data: DeathCertificate[] }>('/death-certificate'),
  
  getOne: (id: string) => axios.get<{ success: boolean; data: DeathCertificate }>(`/death-certificate/${id}`),
  
  create: (data: any) => axios.post('/death-certificate', data),
  
  register: (id: string, signature: string) =>
    axios.put(`/death-certificate/${id}/register`, { districtRegistrarSignature: signature }),
    
  // Search by ID Number (National ID of deceased)
  searchByIdNumber: (idNumber: string) => 
    axios.get<{ success: boolean; data: DeathCertificate[] }>(`/death-certificate/search?idNumber=${idNumber}`),
    
  // Search by Registration Number
  searchByRegistrationNumber: (regNumber: string) => 
    axios.get<{ success: boolean; data: DeathCertificate }>(`/death-certificate/search/registration/${regNumber}`),
    
  // Search by Name
  searchByName: (firstName: string, surname: string) => 
    axios.get<{ success: boolean; data: DeathCertificate[] }>(`/death-certificate/search?firstName=${firstName}&surname=${surname}`),
};