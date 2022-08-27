import { createSlice } from "@reduxjs/toolkit";
interface ModalStatus {
  status: boolean;
  txHash?: string;
  chainId?: number;
}
interface ModalsState {
  generalModal: boolean;
  connectWalletModal: boolean;
  fromTokenlistModal: boolean;
  fromNetworklistModal: boolean;
  ToTokenlistModal: boolean;
  ToNetworklistModal: boolean;
  fromAdvanceSettingModal: boolean;
  SuccessModalState: ModalStatus;
  FailedModalState: ModalStatus;
}
const initialState: ModalsState = {
  generalModal: false,
  connectWalletModal: false,
  fromTokenlistModal: false,
  fromNetworklistModal: false,
  ToTokenlistModal: false,
  ToNetworklistModal: false,
  fromAdvanceSettingModal: false,
  SuccessModalState: { status: false, txHash: "" },
  FailedModalState: { status: false, txHash: "" },
};
export const modalssSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    changeModalStatus: (state, action) => {
      state.generalModal = action.payload;
    },
    connectWalletStatus: (state, action) => {
      state.generalModal = true;
      state.connectWalletModal = action.payload;
      state.fromTokenlistModal = !action.payload;
      state.fromNetworklistModal = !action.payload;
      state.ToTokenlistModal = !action.payload;
      state.ToNetworklistModal = !action.payload;
      state.fromAdvanceSettingModal = !action.payload;
      state.SuccessModalState = { status: !action.payload };
      state.FailedModalState = { status: !action.payload };
    },
    fromTokenlistStatus: (state, action) => {
      state.generalModal = true;
      state.fromTokenlistModal = action.payload;
      state.connectWalletModal = !action.payload;
      state.fromNetworklistModal = !action.payload;
      state.ToTokenlistModal = !action.payload;
      state.ToNetworklistModal = !action.payload;
      state.fromAdvanceSettingModal = !action.payload;
      state.SuccessModalState = { status: !action.payload };
      state.FailedModalState = { status: !action.payload };
    },
    fromNetworklistStatus: (state, action) => {
      state.generalModal = true;
      state.fromNetworklistModal = action.payload;
      state.fromTokenlistModal = !action.payload;
      state.connectWalletModal = !action.payload;
      state.ToTokenlistModal = !action.payload;
      state.ToNetworklistModal = !action.payload;
      state.fromAdvanceSettingModal = !action.payload;
      state.SuccessModalState = { status: !action.payload };
      state.FailedModalState = { status: !action.payload };
    },
    ToTokenlistStatus: (state, action) => {
      state.generalModal = true;
      state.ToTokenlistModal = action.payload;
      state.fromTokenlistModal = !action.payload;
      state.connectWalletModal = !action.payload;
      state.fromNetworklistModal = !action.payload;
      state.ToNetworklistModal = !action.payload;
      state.fromAdvanceSettingModal = !action.payload;
      state.SuccessModalState = { status: !action.payload };
      state.FailedModalState = { status: !action.payload };
    },
    ToNetworklistStatus: (state, action) => {
      state.generalModal = true;
      state.ToNetworklistModal = action.payload;
      state.fromTokenlistModal = !action.payload;
      state.connectWalletModal = !action.payload;
      state.fromNetworklistModal = !action.payload;
      state.ToTokenlistModal = !action.payload;
      state.fromAdvanceSettingModal = !action.payload;
      state.SuccessModalState = { status: !action.payload };
      state.FailedModalState = { status: !action.payload };
    },
    FromAdvanceSettingStatus: (state, action) => {
      state.generalModal = true;
      state.fromAdvanceSettingModal = action.payload;
      state.ToNetworklistModal = !action.payload;
      state.fromTokenlistModal = !action.payload;
      state.connectWalletModal = !action.payload;
      state.fromNetworklistModal = !action.payload;
      state.ToTokenlistModal = !action.payload;
      state.SuccessModalState = { status: !action.payload };
      state.FailedModalState = { status: !action.payload };
    },
    SuccessModalStateStatus: (state, action) => {
      state.generalModal = true;
      state.SuccessModalState = { status: action.payload.status,txHash:action.payload.txHash };
      state.fromAdvanceSettingModal = !action.payload;
      state.ToNetworklistModal = !action.payload;
      state.fromTokenlistModal = !action.payload;
      state.connectWalletModal = !action.payload;
      state.fromNetworklistModal = !action.payload;
      state.ToTokenlistModal = !action.payload;
      state.FailedModalState = { status: !action.payload.status };
    },
    FailedModalStateStatus: (state, action) => {
      state.generalModal = true;
      state.FailedModalState = { status: action.payload.status };
      state.fromAdvanceSettingModal = !action.payload;
      state.ToNetworklistModal = !action.payload;
      state.fromTokenlistModal = !action.payload;
      state.connectWalletModal = !action.payload;
      state.fromNetworklistModal = !action.payload;
      state.ToTokenlistModal = !action.payload;
      state.SuccessModalState = { status: !action.payload.status };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeModalStatus,
  connectWalletStatus,
  fromTokenlistStatus,
  fromNetworklistStatus,
  ToTokenlistStatus,
  ToNetworklistStatus,
  FromAdvanceSettingStatus,
  SuccessModalStateStatus,
  FailedModalStateStatus,
} = modalssSlice.actions;

export default modalssSlice.reducer;
