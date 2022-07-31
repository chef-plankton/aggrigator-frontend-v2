import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BigNumber } from "ethers";
export type WalletName = "metamask" | "walletconnect" | "";
export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}
interface AccountState {
  wallet: WalletName;
  address: string;
  approvestate: ApprovalState;
  approvevalue: BigNumber;
}
const initialState: AccountState = {
  wallet: "",
  address: "",
  approvestate: ApprovalState.UNKNOWN,
  approvevalue: null,
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
    changeApprovevalue: (state, action) => {
      state.approvevalue = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeWallet, changeAddress, changeApprovevalue } =
  accountSlice.actions;

export default accountSlice.reducer;
