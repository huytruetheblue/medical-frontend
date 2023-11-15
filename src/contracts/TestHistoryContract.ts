import { ethers } from "ethers";
import { TestInfo } from "@/_types_";
import { getRPC } from "./utils/common";
import { BaseInterface } from "./interfaces";
import { getTestHistoryAbi } from "./utils/getAbis";
import { getTestHistoryAddress } from "./utils/getAddress";

export default class TestHistoryContract extends BaseInterface {
  constructor(provider?: ethers.providers.Web3Provider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(
      provider || rpcProvider,
      getTestHistoryAddress(),
      getTestHistoryAbi()
    );
    if (!provider) {
      this._contract = new ethers.Contract(
        this._contractAddress,
        this._abis,
        rpcProvider
      );
    }
  }

  addTest = async (patient: String, testName: String, testResult: String) => {
    const rs = await this._contract.addTest(patient, testName, testResult);
    return this._handleTransactionResponse(rs);
  };

  getTestHistory = async (address: String): Promise<TestInfo[]> => {
    const rs = await this._contract.getTestHistory(address);
    const results: TestInfo[] = [];
    for (let i = 0; i < rs.length; i += 1) {
      const result = rs[i];
      results.push({
        testName: result.testName,
        testResult: result.testResult,
        date: new Date(result.timestamp * 1000),
        sender: result.sender,
      });
    }
    return results;
  };
}
