import { MedicalExamination, PrescriptionInfo } from "@/_types_";
import { ethers } from "ethers";
import { getRPC } from "./utils/common";
import { BaseInterface } from "./interfaces";
import { getMedicalExaminationAbi } from "./utils/getAbis";
import { getMedicalExaminationAddress } from "./utils/getAddress";

export default class MedicalExaminationContract extends BaseInterface {
  constructor(provider?: ethers.providers.Web3Provider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(
      provider || rpcProvider,
      getMedicalExaminationAddress(),
      getMedicalExaminationAbi()
    );
    if (!provider) {
      this._contract = new ethers.Contract(
        this._contractAddress,
        this._abis,
        rpcProvider
      );
    }
  }

  addMedicalExamination = async (
    _addressPatient: String,
    _sympton: String,
    _diagnostic: String,
    _medicalNames: String[],
    _medicalResults: String[]
  ) => {
    const rs = await this._contract.addMedicalExamination(
      _addressPatient,
      _sympton,
      _diagnostic,
      _medicalNames,
      _medicalResults
    );
    return this._handleTransactionResponse(rs);
  };

  getAllMedicalExaminations = async (
    address: String
  ): Promise<MedicalExamination[]> => {
    const rs = await this._contract.getAllMedicalExaminations(address);
    const results: MedicalExamination[] = [];

    for (let i = 0; i < rs.length; i += 1) {
      const result = rs[i];

      const prescriptions: PrescriptionInfo[] = [];
      for (let j = 0; j < result.medicalName.length; j += 1) {
        prescriptions.push({
          medicineName: result.medicalName[i],
          medicineDosage: result.medicalDosage[i],
        });
      }
      results.push({
        sympton: result.sympton,
        diagnostic: result.diagnostic,
        prescription: prescriptions,
        date: new Date(result.timestamp * 1000),
      });
    }
    return results;
  };

  getMedicalExamination = async (
    address: String,
    index: Number
  ): Promise<MedicalExamination> => {
    const rs = await this._contract.getMedicalExamination(address, index);
    const prescriptions: PrescriptionInfo[] = [];
    for (let i = 0; i < rs.medicalName.length; i += 1) {
      prescriptions.push({
        medicineName: rs.medicalName[i],
        medicineDosage: rs.medicalDosage[i],
      });
    }
    const result: MedicalExamination = {
      sympton: rs.sympton,
      diagnostic: rs.diagnostic,
      prescription: prescriptions,
      date: new Date(rs.timestamp * 1000),
    };
    return result;
  };
}
