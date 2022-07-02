import { createSlice } from "@reduxjs/toolkit";
interface AccountState {
  wallet: string;
  address: string;
}
const initialState: AccountState = {
  wallet: "",
  address: "",
};
export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    changeWallet: (state, action) => {
      state.wallet = action.payload;
    },
    changeAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeWallet, changeAddress } = accountSlice.actions;

export default accountSlice.reducer;
