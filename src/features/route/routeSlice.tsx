import { createSlice } from "@reduxjs/toolkit";
interface FromtokenType{
name: string;
adress: string;
image: string;
}
interface RouteState {
  fromChain: number;
  fromToken: FromtokenType;
  toChain: number;
  toToken: number;
  // slippageTolerance: number;
}
const initialState: RouteState = {
  fromChain: 56,
  fromToken: { name: "", adress: "", image: "" },
  toChain: 56,
  toToken: 0,
  // slippageTolerance: 0.01,
};
export const chainsSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    changeFromChain: (state, action) => {
      state.fromChain = action.payload;
    },
    changeFromToken: (state, action) => {
      state.fromToken = action.payload;
    },
    changeToChain: (state, action) => {
      state.toChain = action.payload;
    },
    changeToToken: (state, action) => {
      state.toToken = action.payload;
    },
    // changeSlippageTolerance: (state, action) => {
    //   state.slippageTolerance = action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeFromChain,
  changeFromToken,
  changeToChain,
  changeToToken,
  // changeSlippageTolerance,
} = chainsSlice.actions;

export default chainsSlice.reducer;
