import { IWalletInfo } from "@/_types_";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";

export interface AccountState {
  wallet?: IWalletInfo;
  web3Provider?: ethers.providers.Web3Provider;
}

const initialState: AccountState = {};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setWeb3Provider: (
      state,
      action: PayloadAction<ethers.providers.Web3Provider>
    ) => {
      state.web3Provider = action.payload;
    },
    setWalletInfo: (state, action: PayloadAction<IWalletInfo>) => {
      state.wallet = action.payload;
    },
    clearState: (state) => {
      state.web3Provider = undefined;
      state.wallet = undefined;
    },
  },
});

export const { setWalletInfo, setWeb3Provider, clearState } =
  accountSlice.actions;
export default accountSlice.reducer;
