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
  approveState: ApprovalState;
  approvevalue: string;
}
const initialState: AccountState = {
  wallet: "",
  address: "",
  approveState: ApprovalState.UNKNOWN,
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
    changeApprovalState: (state, action) => {
      state.approveState = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeWallet, changeAddress, changeApprovevalue,changeApprovalState } =
  accountSlice.actions;

export default accountSlice.reducer;
