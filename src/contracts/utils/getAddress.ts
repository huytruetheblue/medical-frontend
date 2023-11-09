import getChainIdFromEnv, { AddressType, SMART_ADDRESS } from "./common";

const getAddress = (address: AddressType) => {
  const CHAIN_ID = getChainIdFromEnv() as keyof AddressType;
  return address[CHAIN_ID];
};

export const getACLContractAddress = () =>
  getAddress(SMART_ADDRESS.ACLContract);

export const getTestHistoryAddress = () =>
  getAddress(SMART_ADDRESS.TestHistory);

export const getVaccinationHistoryAddress = () =>
  getAddress(SMART_ADDRESS.VaccinationHistory);

export const getPrescriptionAddress = () =>
  getAddress(SMART_ADDRESS.Prescription);

export const getMedicalRecordAddress = () =>
  getAddress(SMART_ADDRESS.MedicalRecord);

export const getMedicalExaminationAddress = () =>
  getAddress(SMART_ADDRESS.MedicalExamination);
