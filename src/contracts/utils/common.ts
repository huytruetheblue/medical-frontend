export type AddressType = {
  97: string;
  56: string;
};

export enum CHAIN_ID {
  TESTNET = 97,
  MAINNET = 56,
}

export default function getChainIdFromEnv(): number {
  const env = process.env.NEXT_PUBLIC_CHAIN_ID;
  if (!env) {
    return 97;
  }
  return parseInt(env);
}

export const getRPC = () => {
  if (getChainIdFromEnv() === CHAIN_ID.MAINNET)
    return process.env.NEXT_PUBLIC_RPC_MAINNET;
  return process.env.NEXT_PUBLIC_RPC_TESTNET;
};

export const SMART_ADDRESS = {
  ACLContract: { 97: "0xea4F2Ba39F10586a5AD66481fDFF0E201fD31DE9", 56: "" },
  TestHistory: { 97: "0xba791000a8ee54a17ef136Bd3f578aA1b075c283", 56: "" },
  VaccinationHistory: {
    97: "0x8eFc9e20eb52f83c743Fd1A37d88D01D46B86BeD",
    56: "",
  },
  Prescription: { 97: "0xC437b9f7e3df84e9F21653a90F4805BaAd4E7Ba9", 56: "" },
  MedicalRecord: { 97: "0xEF6a88169A950bbB28a0c076D63654532554609b", 56: "" },
  MedicalExamination: {
    97: "0x46cC4A958F3744c3c81Dd831a184e2E062Aaa41c",
    56: "",
  },
};
