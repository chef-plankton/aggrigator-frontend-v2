import { createSlice } from "@reduxjs/toolkit";
interface ModalsState {
  generalModal: boolean;
  connectWalletModal: boolean;
  fromTokenlistModal: boolean;
  fromNetworklistModal: boolean;
}
const initialState: ModalsState = {
  generalModal: false,
  connectWalletModal: false,
  fromTokenlistModal: false,
  fromNetworklistModal: false,
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
    },
    fromTokenlistStatus: (state, action) => {
      state.generalModal = true;
      state.fromTokenlistModal = action.payload;
      state.connectWalletModal = !action.payload;
      state.fromNetworklistModal = !action.payload;
    },
    fromNetworklistStatus: (state, action) => {
      state.generalModal = true;
      state.fromNetworklistModal = action.payload;
      state.fromTokenlistModal = !action.payload;
      state.connectWalletModal = !action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeModalStatus,
  connectWalletStatus,
  fromTokenlistStatus,
  fromNetworklistStatus,
} = modalssSlice.actions;

export default modalssSlice.reducer;
