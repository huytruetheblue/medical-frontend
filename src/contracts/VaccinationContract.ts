import { ethers } from "ethers";
import { VaccinationInfo } from "@/_types_";
import { getRPC } from "./utils/common";
import { BaseInterface } from "./interfaces";
import { getVaccinationHistoryAbi } from "./utils/getAbis";
import { getVaccinationHistoryAddress } from "./utils/getAddress";

export default class VaccinationContract extends BaseInterface {
  constructor(provider?: ethers.providers.Web3Provider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(
      provider || rpcProvider,
      getVaccinationHistoryAddress(),
      getVaccinationHistoryAbi()
    );
    if (!provider) {
      this._contract = new ethers.Contract(
        this._contractAddress,
        this._abis,
        rpcProvider
      );
    }
  }

  addVaccin = async (patient: String, vacType: String, vacName: String) => {
    const rs = await this._contract.addVaccin(patient, vacType, vacName);
    return this._handleTransactionResponse(rs);
  };

  getVaccinHistory = async (address: String): Promise<VaccinationInfo[]> => {
    const rs = await this._contract.getVaccinHistory(address);
    const results: VaccinationInfo[] = [];
    for (let i = 0; i < rs.length; i += 1) {
      const result = rs[i];
      results.push({
        vaccineType: result.vacType,
        vaccineName: result.vacName,
        date: new Date(result.timestamp * 1000),
        sender: result.sender,
      });
    }
    return results;
  };
}
