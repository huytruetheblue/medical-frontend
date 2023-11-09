import { ethers } from "ethers";
import { PatientInfo } from "@/_types_";
import { getRPC } from "./utils/common";
import { BaseInterface } from "./interfaces";
import { getMedicalRecordAbi } from "./utils/getAbis";
import { getMedicalRecordAddress } from "./utils/getAddress";

export default class MedicalRecordContract extends BaseInterface {
  constructor(provider?: ethers.providers.Web3Provider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(
      provider || rpcProvider,
      getMedicalRecordAddress(),
      getMedicalRecordAbi()
    );
    if (!provider) {
      this._contract = new ethers.Contract(
        this._contractAddress,
        this._abis,
        rpcProvider
      );
    }
  }

  addMedicalRecord = async (
    patient: String,
    patientName: String,
    patientAddress: String,
    birthday: String
  ) => {
    const rs = await this._contract.addMedicalRecord(
      patient,
      patientName,
      patientAddress,
      birthday
    );
    return this._handleTransactionResponse(rs);
  };

  getMedicalRecords = async (address: String): Promise<PatientInfo> => {
    const rs = await this._contract.getMedicalRecords(address);
    const result: PatientInfo = {
      patientName: rs.patientName,
      patientAddress: rs.patientAddress,
      patientBirthday: rs.birthday,
      patientGender: rs.gender,
      patientNumber: rs.number,
      createAt: new Date(rs.timestamp * 1000),
    };
    return result;
  };
}
