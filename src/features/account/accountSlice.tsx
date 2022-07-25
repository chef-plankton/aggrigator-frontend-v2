import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type WalletName = "metamask" | "walletconnect" | "";
interface AccountState {
  wallet: WalletName;
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
    changeWallet: (state, action: PayloadAction<WalletName>) => {
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
