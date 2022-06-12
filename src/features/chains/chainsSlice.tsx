import { createSlice } from '@reduxjs/toolkit'
interface ChainsState {
  value: number
}
const initialState: ChainsState = {
  value: 1,
}
export const counterSlice = createSlice({
  name: 'chains',
  initialState,
  reducers: {
    changeChain: (state,action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeChain } = counterSlice.actions

export default counterSlice.reducer