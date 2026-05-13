'use client';

import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: '30%',
    fontWeight: 'bold',
  },
  value: {
    width: '70%',
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
  },
});

// National ID PDF Document
export const NationalIdPDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>NATIONAL ID APPLICATION</Text>
      <Text style={styles.header}>Malawi National Registration Bureau</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Application Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Application Number:</Text>
          <Text style={styles.value}>{data.applicationNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Application Date:</Text>
          <Text style={styles.value}>{new Date(data.applicationDate).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{data.status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Citizenship Score:</Text>
          <Text style={styles.value}>{data.citizenshipScore}/100</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>{data.firstName} {data.surname}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Other Names:</Text>
          <Text style={styles.value}>{data.otherNames || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{new Date(data.dateOfBirth).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{data.gender}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Marital Status:</Text>
          <Text style={styles.value}>{data.maritalStatus}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Nationality:</Text>
          <Text style={styles.value}>{data.nationality}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Place of Birth</Text>
        <View style={styles.row}>
          <Text style={styles.label}>District:</Text>
          <Text style={styles.value}>{data.districtOfBirth}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Traditional Authority:</Text>
          <Text style={styles.value}>{data.taOfBirth}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Village:</Text>
          <Text style={styles.value}>{data.villageOfBirth}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Residential Address</Text>
        <View style={styles.row}>
          <Text style={styles.label}>District:</Text>
          <Text style={styles.value}>{data.residentialDistrict}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Traditional Authority:</Text>
          <Text style={styles.value}>{data.residentialTA}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Village:</Text>
          <Text style={styles.value}>{data.residentialVillage}</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Generated on {new Date().toLocaleString()}
      </Text>
    </Page>
  </Document>
);

// Death Certificate PDF Document
export const DeathCertificatePDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>DEATH CERTIFICATE</Text>
      <Text style={styles.header}>Malawi National Registration Bureau</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certificate Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Registration Number:</Text>
          <Text style={styles.value}>{data.registrationNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date Registered:</Text>
          <Text style={styles.value}>{new Date(data.createdAt).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{data.status}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Deceased Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>{data.firstName} {data.surname}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{new Date(data.dateOfBirth).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date of Death:</Text>
          <Text style={styles.value}>{new Date(data.dateOfDeath).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{data.gender}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Nationality:</Text>
          <Text style={styles.value}>{data.nationality}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Place of Death:</Text>
          <Text style={styles.value}>{data.placeOfDeath}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Manner of Death:</Text>
          <Text style={styles.value}>{data.mannerOfDeath}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Parents Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Mother's Name:</Text>
          <Text style={styles.value}>{data.motherFirstName} {data.motherSurname}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Mother's Nationality:</Text>
          <Text style={styles.value}>{data.motherNationality}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Father's Name:</Text>
          <Text style={styles.value}>{data.fatherFirstName} {data.fatherSurname}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Father's Nationality:</Text>
          <Text style={styles.value}>{data.fatherNationality}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informant Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{data.informantFirstName} {data.informantSurname}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Relationship:</Text>
          <Text style={styles.value}>{data.informantRelationship}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>ID Number:</Text>
          <Text style={styles.value}>{data.informantIdNo}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{data.informantAddress}</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        This is an official death certificate issued by the National Registration Bureau.
        Generated on {new Date().toLocaleString()}
      </Text>
    </Page>
  </Document>
);

// Download Button Component
export const DownloadPDFButton = ({ type, data, label }: { type: 'national' | 'death', data: any, label: string }) => {
  const PDFDocument = type === 'national' ? NationalIdPDF : DeathCertificatePDF;
  
  return (
    <PDFDownloadLink document={<PDFDocument data={data} />} fileName={`${type}_application_${data.id}.pdf`}>
      {({ loading }) => (
        <button 
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? 'Generating PDF...' : label}
        </button>
      )}
    </PDFDownloadLink>
  );
};