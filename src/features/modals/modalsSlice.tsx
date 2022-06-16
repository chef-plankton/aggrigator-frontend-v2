import { createSlice } from "@reduxjs/toolkit";
interface ModalsState {
  generalModal: boolean;
}
const initialState: ModalsState = {
  generalModal: false,
};
export const modalssSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    changeModalStatus: (state, action) => {
      state.generalModal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeModalStatus } = modalssSlice.actions;

export default modalssSlice.reducer;
