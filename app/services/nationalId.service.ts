
import axios from '../lib/axios';

export interface NationalIdApplication {
  id: string;
  applicationNumber: string;
  firstName: string;
  surname: string;
  otherNames?: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  secondNationality?: string;
  maritalStatus: string;
  residentialDistrict: string;
  residentialTA: string;
  residentialVillage: string;
  permanentDistrict: string;
  permanentTA: string;
  permanentVillage: string;
  districtOfBirth: string;  
  taOfBirth: string;        
  villageOfBirth: string;   
  birthCertificateNo?: string;
  motherIdNo?: string;
  motherFullName: string;
  motherNationality: string;
  motherDistrict: string;
  motherTA: string;
  motherVillage: string;
  fatherIdNo?: string;
  fatherFullName: string;
  fatherNationality: string;
  fatherDistrict: string;
  fatherTA: string;
  fatherVillage: string;
  firstWitnessIdNo: string;
  firstWitnessSignature?: string;
  secondWitnessIdNo: string;
  secondWitnessSignature?: string;
  applicantSignature?: string;
  villageHeadIdNo?: string;
  villageHeadSignature?: string;
  villageHeadStamp?: string;
  status: string;
  citizenshipScore: number;
  isEligible: boolean;
  rejectionReason?: string;
  createdAt: string;
  updatedAt?: string;
}

export const nationalIdService = {
  getAll: () => axios.get('/v1/national-id'),
  getOne: (id: string) => axios.get(`/v1/national-id/${id}`),
  create: (data: any) => axios.post('/v1/national-id', data),
  verifyByVillageHead: (id: string, villageHeadIdNo: string, signature: string) =>
    axios.put(`/v1/national-id/${id}/verify-village`, { villageHeadIdNo, signature }),
  verify: (nationalIdNumber: string, surname: string) =>
    axios.get(`/v1/national-id/verify/${nationalIdNumber}`, { params: { surname } }),
  verifyBatch: (nationalIdNumbers: string[]) =>
    axios.post('/v1/national-id/verify/batch', { nationalIdNumbers }),
  uploadDocument: (id: string, file: File, documentType: string) => {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('documentType', documentType);
    return axios.post(`/v1/national-id/${id}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  downloadReport: (startDate: string, endDate: string) =>
    axios.get('/v1/national-id/reports/download', { 
      params: { startDate, endDate },
      responseType: 'blob',
    }),
};

export default nationalIdService;