import { createSlice } from "@reduxjs/toolkit";
interface ThemeState {
  value: string;
}
const initialState: ThemeState = {
  value: 'light',
};
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
