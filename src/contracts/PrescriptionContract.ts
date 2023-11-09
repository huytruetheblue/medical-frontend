import { ethers } from "ethers";
import { PrescriptionInfo } from "@/_types_";
import { getRPC } from "./utils/common";
import { BaseInterface } from "./interfaces";
import { getPrescriptionAbi } from "./utils/getAbis";
import { getPrescriptionAddress } from "./utils/getAddress";

export default class PrescriptionContract extends BaseInterface {
  constructor(provider?: ethers.providers.Web3Provider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(
      provider || rpcProvider,
      getPrescriptionAddress(),
      getPrescriptionAbi()
    );
    if (!provider) {
      this._contract = new ethers.Contract(
        this._contractAddress,
        this._abis,
        rpcProvider
      );
    }
  }

  addPrescription = async (
    patient: String,
    medicalName: String,
    medicalResult: String
  ) => {
    const rs = await this._contract.addPrescription(
      patient,
      medicalName,
      medicalResult
    );
    return this._handleTransactionResponse(rs);
  };

  getPrescription = async (address: String): Promise<PrescriptionInfo[]> => {
    const rs = await this._contract.getPrescription(address);
    const results: PrescriptionInfo[] = [];
    for (let i = 0; i < rs.length; i += 1) {
      const result = rs[i];
      results.push({
        medicineName: result.medicalName,
        medicineAmount: result.amount,
        date: new Date(result.timestamp * 1000),
      });
    }
    return results;
  };
}
