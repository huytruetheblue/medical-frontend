import ACLContractAbi from "../abis/ACLContractAbi.json";
import TestHistoryAbi from "../abis/TestHistoryAbi.json";
import VaccinationHistoryAbi from "../abis/VaccinationHistoryAbi.json";
import PrescriptionAbi from "../abis/PrescriptionAbi.json";
import MedicalRecordAbi from "../abis/MedicalRecordAbi.json";
import MedicalExaminationAbi from "../abis/MedicalExaminationAbi.json";

export const getVaccinationHistoryAbi = () => VaccinationHistoryAbi;
export const getACLContractAbi = () => ACLContractAbi;
export const getTestHistoryAbi = () => TestHistoryAbi;
export const getPrescriptionAbi = () => PrescriptionAbi;
export const getMedicalRecordAbi = () => MedicalRecordAbi;
export const getMedicalExaminationAbi = () => MedicalExaminationAbi;
