import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AddressState {
  address?: string;
}
const initialState: AddressState = {};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddressPatient: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    clearAddressPatient: (state) => {
      state.address = "";
    },
  },
});

export const { setAddressPatient, clearAddressPatient } = addressSlice.actions;

export default addressSlice.reducer;
