import axios from '../lib/axios';

export interface DeathCertificate {
  id: string;
  certificateNumber: string;
  registrationNumber?: string;
  surname: string;
  firstName: string;
  otherNames?: string;
  idNumber?: string;
  deceasedNationalId?: string;
  nationality: string;
  gender: string;
  dateOfBirth: string;
  dateOfDeath: string;
  causeOfDeath?: string;
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
  isValid?: boolean;
  createdAt: string;
  updatedAt?: string;
  dateOfRegistration?: string;
  districtRegistrarSignature?: string;
}

export const deathCertificateService = {
  getAll: () => axios.get('/v1/death-certificate'),
  getOne: (id: string) => axios.get(`/v1/death-certificate/${id}`),
  create: (data: any) => axios.post('/v1/death-certificate', data),
  register: (id: string, signature: string) => 
    axios.put(`/v1/death-certificate/${id}/register`, { districtRegistrarSignature: signature }),
  search: (params: { idNumber?: string; firstName?: string; surname?: string }) => 
    axios.get('/v1/death-certificate/search', { params }),
  searchByRegistration: (certificateNumber: string) => 
    axios.get(`/v1/death-certificate/search/registration/${certificateNumber}`),
  verify: (certificateNumber: string) => 
    axios.get(`/v1/death-certificate/verify/${certificateNumber}`),
  verifyByNationalId: (nationalId: string) => 
    axios.get(`/v1/death-certificate/verify/by-national-id/${nationalId}`),
};

export default deathCertificateService;