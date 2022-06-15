import { createSlice } from "@reduxjs/toolkit";
interface ChainsState {
  value: number;
}
const initialState: ChainsState = {
  value: 56,
};
export const chainsSlice = createSlice({
  name: "chains",
  initialState,
  reducers: {
    changeChain: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeChain } = chainsSlice.actions;

export default chainsSlice.reducer;
