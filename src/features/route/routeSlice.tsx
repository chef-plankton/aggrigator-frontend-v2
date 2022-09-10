import { createSlice } from "@reduxjs/toolkit";
import { RouteResponseDto } from "../../config/constants/types";
interface FromtokenType {
  name: string;
  adress: string;
  image: string;
  symbol: string;
  decimals: number;
}
interface totokenType {
  name: string;
  adress: string;
  image: string;
  symbol: string;
  decimals: number;
}

interface RouteState {
  isLoading: boolean;
  fromChain: number;
  fromToken: FromtokenType;
  toChain: number;
  toToken: totokenType;
  amount: string;
  recieve: number | string;
  showRoute: boolean;
  counter: number;
  responseData: RouteResponseDto;
  swapDescription: string;
  oneChainSwapDesc: string;
  quoteLayerZeroFeeSwapDesc: string;
  payloadEncodeSwapDesc: string;
  responseString: string;
  // slippageTolerance: number;
}
const initialState: RouteState = {
  isLoading: false,
  fromChain: 56,
  fromToken: {
    name: "Wrapped BNB",
    adress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    image: "",
    symbol: "WBNB",
    decimals: 18,
  },
  toChain: 250,
  toToken: {
    name: "USD Coin",
    adress: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
    image: "",
    symbol: "USDC",
    decimals: 6,
  },
  amount: "",
  recieve: "",
  showRoute: false,
  counter: 0,
  swapDescription: null,
  oneChainSwapDesc: null,
  quoteLayerZeroFeeSwapDesc: null,
  payloadEncodeSwapDesc: null,
  responseData: null,
  responseString: "",
  // slippageTolerance: 0.01,
};
export const chainsSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    changeIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
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
    changeOneChainSwapDesc: (state, action) => {
      state.oneChainSwapDesc = action.payload;
    },
    changeQuoteLayerZeroFeeSwapDesc: (state, action) => {
      state.quoteLayerZeroFeeSwapDesc = action.payload;
    },
    changePayloadEncodeSwapDesc: (state, action) => {
      state.payloadEncodeSwapDesc = action.payload;
    },
    clearRouteAfterSwap: () => initialState,
    // changeSlippageTolerance: (state, action) => {
    //   state.slippageTolerance = action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeIsLoading,
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
  changeOneChainSwapDesc,
  changeQuoteLayerZeroFeeSwapDesc,
  changePayloadEncodeSwapDesc,
  clearRouteAfterSwap,
  // changeSlippageTolerance,
} = chainsSlice.actions;

export default chainsSlice.reducer;
