// services/nationalId.service.ts
import axios from '../lib/axios';

export interface NationalIdApplication {
  id: string;
  applicationNumber: string;
  firstName: string;
  surname: string;
  otherNames?: string;
  nationality: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE';
  districtOfBirth: string;
  taOfBirth: string;
  villageOfBirth: string;
  maritalStatus: string;
  residentialDistrict: string;
  residentialTA: string;
  residentialVillage: string;
  permanentDistrict: string;
  permanentTA: string;
  permanentVillage: string;
  motherFullName: string;
  motherNationality: string;
  motherDistrict: string;
  motherTA: string;
  motherVillage: string;
  fatherFullName: string;
  fatherNationality: string;
  fatherDistrict: string;
  fatherTA: string;
  fatherVillage: string;
  firstWitnessIdNo: string;
  secondWitnessIdNo: string;
  status: string;
  citizenshipScore: number;
  isEligible: boolean;
  createdAt: string;
}

export const nationalIdService = {
  getAll: () => axios.get<{ success: boolean; data: NationalIdApplication[] }>('/national-id'),
  
  getOne: (id: string) => axios.get<{ success: boolean; data: NationalIdApplication }>(`/national-id/${id}`),
  
  create: (data: any) => axios.post('/national-id', data),
  
  verifyByVillageHead: (id: string, villageHeadIdNo: string, signature: string) => 
    axios.put(`/national-id/${id}/verify-village`, { villageHeadIdNo, signature }),
};