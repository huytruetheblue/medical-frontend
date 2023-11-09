import { ethers } from "ethers";
import { TestInfo } from "@/_types_";
import { getRPC } from "./utils/common";
import { BaseInterface } from "./interfaces";
import { getACLContractAbi } from "./utils/getAbis";
import { getACLContractAddress } from "./utils/getAddress";

export default class ACLContract extends BaseInterface {
  constructor(provider?: ethers.providers.Web3Provider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(
      provider || rpcProvider,
      getACLContractAddress(),
      getACLContractAbi()
    );
    if (!provider) {
      this._contract = new ethers.Contract(
        this._contractAddress,
        this._abis,
        rpcProvider
      );
    }
  }

  hasDoctorOrNurseRole = async (address: String): Promise<TestInfo[]> => {
    const rs = await this._contract.hasDoctorOrNurseRole(address);
    return rs;
  };
}
