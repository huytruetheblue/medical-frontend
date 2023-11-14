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
  ACLContract: {
    97: "0xea4F2Ba39F10586a5AD66481fDFF0E201fD31DE9",
    56: "0xea4F2Ba39F10586a5AD66481fDFF0E201fD31DE9",
  },
  TestHistory: {
    97: "0xbc39FDA4925307Ad1B54BB44Cd16485B80E514b7",
    56: "0xbc39FDA4925307Ad1B54BB44Cd16485B80E514b7",
  },
  VaccinationHistory: {
    97: "0x7B068FFc7B302cFF41225070A97f32b00DcA41Ce",
    56: "0x7B068FFc7B302cFF41225070A97f32b00DcA41Ce",
  },
  MedicalRecord: {
    97: "0x8e1a381B41B59D75E00889A541029bEFB1b04A39",
    56: "0x8e1a381B41B59D75E00889A541029bEFB1b04A39",
  },
  MedicalExamination: {
    97: "0x52d06AEb7ba7418f13Af1430bF751282827c0258",
    56: "0x52d06AEb7ba7418f13Af1430bF751282827c0258",
  },
};
