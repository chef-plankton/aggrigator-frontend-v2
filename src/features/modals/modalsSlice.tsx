import { createSlice } from "@reduxjs/toolkit";
interface ModalsState {
  generalModal: boolean;
  connectWalletModal: boolean;
  fromTokenlistModal: boolean;
  fromNetworklistModal: boolean;
  ToTokenlistModal: boolean;
  ToNetworklistModal: boolean;
  fromAdvanceSettingModal: boolean;
}
const initialState: ModalsState = {
  generalModal: false,
  connectWalletModal: false,
  fromTokenlistModal: false,
  fromNetworklistModal: false,
  ToTokenlistModal: false,
  ToNetworklistModal: false,
  fromAdvanceSettingModal: false,
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
    },
    fromTokenlistStatus: (state, action) => {
      state.generalModal = true;
      state.fromTokenlistModal = action.payload;
      state.connectWalletModal = !action.payload;
      state.fromNetworklistModal = !action.payload;
      state.ToTokenlistModal = !action.payload;
      state.ToNetworklistModal = !action.payload;
      state.fromAdvanceSettingModal = !action.payload;
    },
    fromNetworklistStatus: (state, action) => {
      state.generalModal = true;
      state.fromNetworklistModal = action.payload;
      state.fromTokenlistModal = !action.payload;
      state.connectWalletModal = !action.payload;
      state.ToTokenlistModal = !action.payload;
      state.ToNetworklistModal = !action.payload;
      state.fromAdvanceSettingModal = !action.payload;
    },
    ToTokenlistStatus: (state, action) => {
      state.generalModal = true;
      state.ToTokenlistModal = action.payload;
      state.fromTokenlistModal = !action.payload;
      state.connectWalletModal = !action.payload;
      state.fromNetworklistModal = !action.payload;
      state.ToNetworklistModal = !action.payload;
      state.fromAdvanceSettingModal = !action.payload;
    },
    ToNetworklistStatus: (state, action) => {
      state.generalModal = true;
      state.ToNetworklistModal = action.payload;
      state.fromTokenlistModal = !action.payload;
      state.connectWalletModal = !action.payload;
      state.fromNetworklistModal = !action.payload;
      state.ToTokenlistModal = !action.payload;
      state.fromAdvanceSettingModal = !action.payload;
    },
    FromAdvanceSettingStatus: (state, action) => {
      state.generalModal = true;
      state.fromAdvanceSettingModal = action.payload;
      state.ToNetworklistModal = !action.payload;
      state.fromTokenlistModal = !action.payload;
      state.connectWalletModal = !action.payload;
      state.fromNetworklistModal = !action.payload;
      state.ToTokenlistModal = !action.payload;
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
} = modalssSlice.actions;

export default modalssSlice.reducer;
