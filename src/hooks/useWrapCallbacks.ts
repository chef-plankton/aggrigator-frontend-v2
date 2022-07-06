import {
  Currency,
  CurrencyAmount,
  currencyEquals,
  ETHER,
  Token,
  TokenAmount,
  WETH,
} from "@pancakeswap/sdk";
import { useEffect, useMemo } from "react";
// import useActiveWeb3React from 'hooks/useActiveWeb3React'
import tryParseAmount from "../utils/tryParseAmount";

import { useERC20, useWBNBContract } from "./useContract";
import { useCallWithGasPrice } from "./useCallWithGasPrice";
import useWallet from "../components/Wallets/useWallet";
import { formatEther } from "@ethersproject/units";

export enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP,
}

const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE };
/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */
export default function useWrapCallback(
  inputCurrency: Currency | undefined,
  outputCurrency: Currency | undefined,
  typedValue: string | undefined
): {
  wrapType: WrapType;
  execute?: undefined | (() => Promise<void>);
  inputError?: string;
} {
  const chainId = 97;
  const { callWithGasPrice } = useCallWithGasPrice();
  const wbnbContract = useWBNBContract();

  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const inputAmount = useMemo(
    () => tryParseAmount(typedValue, inputCurrency),
    [inputCurrency, typedValue]
  );
  const balance = 0.2;
  return useMemo(() => {
    if (!wbnbContract || !chainId || !inputCurrency || !outputCurrency)
      return NOT_APPLICABLE;

    if (
      inputCurrency === ETHER &&
      currencyEquals(WETH[chainId], outputCurrency)
    ) {
      return {
        wrapType: WrapType.WRAP,
        execute: inputAmount
          ? async () => {
              try {
                const txReceipt = await callWithGasPrice(
                  wbnbContract,
                  "deposit",
                  undefined,
                  {
                    value: `0x${inputAmount.raw.toString(16)}`,
                  }
                );
              } catch (error) {
                console.error("Could not deposit", error);
              }
            }
          : undefined,
      };
    }
    if (
      currencyEquals(WETH[chainId], inputCurrency) &&
      outputCurrency === ETHER
    ) {
      return {
        wrapType: WrapType.UNWRAP,
        execute: inputAmount
          ? async () => {
              try {
                const txReceipt = await callWithGasPrice(
                  wbnbContract,
                  "withdraw",
                  [`0x${inputAmount.raw.toString(16)}`]
                );
              } catch (error) {
                console.error("Could not withdraw", error);
              }
            }
          : undefined,
      };
    }
    return NOT_APPLICABLE;
  }, [
    wbnbContract,
    chainId,
    inputCurrency,
    outputCurrency,
    inputAmount,
    balance,
    callWithGasPrice,
  ]);
}
