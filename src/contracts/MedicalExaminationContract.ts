import { MedicalExamination } from "@/_types_";
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
    _sympton: String,
    _diagnostic: String,
    _medicalRecord: String
  ) => {
    const rs = await this._contract.addMedicalExamination(
      _sympton,
      _diagnostic,
      _medicalRecord
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
      results.push({
        sympton: result.sympton,
        diagnostic: result.diagnostic,
        medicalRecord: result.medicalRecord,
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
    const result: MedicalExamination = {
      sympton: rs.sympton,
      diagnostic: rs.diagnostic,
      medicalRecord: rs.medicalRecord,
      date: new Date(rs.timestamp * 1000),
    };
    return result;
  };
}
