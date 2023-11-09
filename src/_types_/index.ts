export interface IWalletInfo {
  address: string;
  bnb: number;
}

export interface IMenu {
  name: string;
  url: string;
}

export interface TestInfo {
  testName: string;
  testResult: string;
  date: Date;
}

export interface PatientInfo {
  patientName: string;
  patientAddress: string;
  patientBirthday: string;
  patientGender: "Nam" | "Nữ" | undefined;
  patientNumber: string;
}

export interface MedicalRecords {
  patientinfo: PatientInfo;
  medicalExamination: MedicalExamination[];
  prescription: PrescriptionInfo[];
  vaccination: VaccinationInfo[];
  tests: TestInfo[];
}

export interface PrescriptionInfo {
  medicineName: string;
  medicineDosage: string;
}

export interface VaccinationInfo {
  vaccineName: string;
  vaccineAmount: string;
  date: Date;
}

export interface MedicalExamination {
  sympton: string;
  diagnostic: string;
  medicalRecord: string;
  date: Date;
}
