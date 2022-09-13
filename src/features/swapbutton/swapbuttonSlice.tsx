import { createSlice } from "@reduxjs/toolkit";
enum SwapButonStates {
  CONNECT_TO_WALLET = "CONNECT_TO_WALLET",
  ENTER_AMOUNT = "ENTER_AMOUNT",
  APPROVE = "APPROVE",
  LOADING = "LOADING",
  SWAP = "SWAP",
  WRAP = "WRAP",
  INSUFFICIENT_BALANCE = "INSUFFICIENT_BALANCE",
}
interface RouteState {
  value: {
    text: string;
    isDisable?: boolean;
    state: SwapButonStates;
  };
}
const initialState: RouteState = {
  value: {
    text: "",
    isDisable: false,
    state: null,
  },
};
export const swapbuttonSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    changeSwapButtonState: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSwapButtonState } = swapbuttonSlice.actions;

export default swapbuttonSlice.reducer;
