import { Currency, currencyEquals, ETHER, WETH } from "@pancakeswap/sdk";
import { useMemo } from "react";
import { useTransactionAdder } from "../state/transactions/hooks";
import { useWBNBContract } from "./useContract";
import { useCallWithoutGasPrice } from "./useCallWithoutGasPrice";
import useWallet from "../components/Wallets/useWallet";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { ethers } from "ethers";

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
export default function useAkkaCallback(
  inputCurrency: String | undefined,
  outputCurrency: String | undefined
): {
  wrapType: WrapType;
  execute?: undefined | (() => Promise<void>);
  inputError?: string;
} {
  const { useAccount, useChainId } = useWallet("metamask");
  const chainId = useChainId();
  const account = useAccount();
  const { callWithoutGasPrice } = useCallWithoutGasPrice();
  const wbnbContract = useWBNBContract();
  // const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const addTransaction = useTransactionAdder();
  const inputAmount = useSelector(({ route }: RootState) => route.amount);
  return useMemo(() => {
    if (!wbnbContract || !chainId || !inputCurrency || !outputCurrency)
      return NOT_APPLICABLE;
    const sufficientBalance = inputAmount;

    if (inputCurrency === "BNB") {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await callWithoutGasPrice(
                    wbnbContract,
                    "deposit",
                    undefined,
                    {
                      gasLimit: 21000000,
                      value: ethers.utils.parseUnits(inputAmount, 18),
                    }
                  );
                  addTransaction(txReceipt, {
                    summary: `Wrap ${inputAmount} BNB to WBNB`,
                    type: "wrap",
                  });
                } catch (error) {
                  console.error("Could not deposit", error);
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : "Insufficient BNB balance",
      };
    }
    if (outputCurrency === "BNB") {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await callWithoutGasPrice(
                    wbnbContract,
                    "withdraw",
                    [`${inputAmount}`]
                  );
                  addTransaction(txReceipt, {
                    summary: `Unwrap ${inputAmount} WBNB to BNB`,
                  });
                } catch (error) {
                  console.error("Could not withdraw", error);
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : "Insufficient WBNB balance",
      };
    }
    return NOT_APPLICABLE;
  }, [
    wbnbContract,
    chainId,
    inputCurrency,
    outputCurrency,
    inputAmount,
    addTransaction,
    callWithoutGasPrice,
  ]);
}
