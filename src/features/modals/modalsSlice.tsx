import { createSlice } from "@reduxjs/toolkit";
interface ModalsState {
  generalModal: boolean;
  connectWalletModal: boolean;
}
const initialState: ModalsState = {
  generalModal: false,
  connectWalletModal: false,
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
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeModalStatus, connectWalletStatus } = modalssSlice.actions;

export default modalssSlice.reducer;
