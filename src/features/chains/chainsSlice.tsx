import { createSlice } from "@reduxjs/toolkit";
interface ChainsState {
  isHidden: boolean,
  value: number;
}
const initialState: ChainsState = {
  isHidden: false,
  value: 56,
};
export const chainsSlice = createSlice({
  name: "chains",
  initialState,
  reducers: {
    changeChain: (state, action) => {
      state.value = action.payload;
    },
    changeStatus: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeChain, changeStatus } = chainsSlice.actions;

export default chainsSlice.reducer;
