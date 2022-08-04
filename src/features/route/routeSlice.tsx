import { createSlice } from "@reduxjs/toolkit";
interface FromtokenType {
  name: string;
  adress: string;
  image: string;
  symbol: string;
}
interface totokenType {
  name: string;
  adress: string;
  image: string;
  symbol: string;
}
interface RouteState {
  fromChain: number;
  fromToken: FromtokenType;
  toChain: number;
  toToken: totokenType;
  amount: string;
  recieve: number | string;
  showRoute: boolean;
  counter: number;
  responseData: {
    data: {
      return_amount: number;
      routes: [
        {
          operations: [];
          operations_seperated: [];
        }
      ];
    };
  };
  swapDescription: string;
  responseString: string;
  // slippageTolerance: number;
}
const initialState: RouteState = {
  fromChain: 56,
  fromToken: { name: "", adress: "", image: "", symbol: "" },
  toChain: 56,
  toToken: { name: "", adress: "", image: "", symbol: "" },
  amount: "",
  recieve: "",
  showRoute: false,
  counter: 0,
  swapDescription: null,
  responseData: {
    data: {
      return_amount: undefined,
      routes: [
        {
          operations: undefined,
          operations_seperated: undefined,
        },
      ],
    },
  },
  responseString: "",
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
    changeAmount: (state, action) => {
      state.amount = action.payload;
    },
    changeRecieve: (state, action) => {
      state.recieve = action.payload;
    },
    changeShowRoute: (state, action) => {
      state.showRoute = action.payload;
    },
    changeResponseData: (state, action) => {
      state.responseData = action.payload;
    },
    changeCounter: (state, action) => {
      state.counter = action.payload;
    },
    changeResponseString: (state, action) => {
      state.responseString = action.payload;
    },
    changeSwapDescription: (state, action) => {
      state.swapDescription = action.payload;
    },
    clearRouteAfterSwap: () => initialState,
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
  changeAmount,
  changeRecieve,
  changeShowRoute,
  changeResponseData,
  changeCounter,
  changeResponseString,
  changeSwapDescription,
  clearRouteAfterSwap,
  // changeSlippageTolerance,
} = chainsSlice.actions;

export default chainsSlice.reducer;
