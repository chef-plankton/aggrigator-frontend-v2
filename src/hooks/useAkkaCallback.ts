import { useEffect, useMemo } from "react";
import { useTransactionAdder } from "../state/transactions/hooks";
import { useAkkaContract } from "./useContract";
import { useCallWithoutGasPrice } from "./useCallWithoutGasPrice";
import useWallet from "../components/Wallets/useWallet";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { AkkaAggrigator } from "../config/abi/types";
import { SwapDescriptionStruct } from "../config/abi/types/AkkaAggrigator";
import { parseEther, parseUnits } from "@ethersproject/units";
import { BigNumber } from "ethers";
import {
  TransactionReceipt,
  TransactionResponse,
} from "@ethersproject/providers";

export enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP,
}

const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE };

export function useAkkaEncodeSwapDescriptionCallback(): {
  getBytes?: undefined | ((swapDescription: SwapDescriptionStruct) => Promise<string>);
  inputError?: string;
} {
  const wallet = useSelector(({ account }: RootState) => account.wallet);
  const { useChainId } = useWallet(wallet);
  const chainId = useChainId();
  const { callWithoutGasPrice } = useCallWithoutGasPrice<
    AkkaAggrigator,
    string
  >();
  const akkaContract = useAkkaContract();
  let parsedResponseString = null;
  // const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const addTransaction = useTransactionAdder();
  const inputAmount = useSelector(({ route }: RootState) => route.amount);
  const fromChain = useSelector(({ route }: RootState) => route.fromChain);
  const toChain = useSelector(({ route }: RootState) => route.toChain);
  const responseString = useSelector(
    ({ route }: RootState) => route.responseString
  );
  useEffect(() => {
    if (responseString !== "") {
      parsedResponseString = JSON.parse(responseString);
    }
  }, [responseString]);
  return useMemo(() => {
    const sufficientBalance = inputAmount;

    return {
      getBytes: async (swapDescription) => {
        const encodedData = await callWithoutGasPrice(
          akkaContract,
          "encodeSwapDescription",
          [
            swapDescription,
          ] as SwapDescriptionStruct[],
          {
            gasLimit: 21000000,
          }
        );
        return encodedData as string;
      },
      inputError: sufficientBalance ? undefined : "Insufficient BNB balance",
    };
  }, [akkaContract, chainId, inputAmount, addTransaction, callWithoutGasPrice]);
}
export function useAkkaCalcLayerZeroFeeCallback(): {
  quoteLayerZeroFee?:
  | undefined
  | ((payload: string) => Promise<[BigNumber, BigNumber]>);
  inputError?: string;
} {
  const { useAccount, useChainId } = useWallet("metamask");
  const chainId = useChainId();
  const account = useAccount();
  const { callWithoutGasPrice } = useCallWithoutGasPrice<
    AkkaAggrigator,
    [BigNumber, BigNumber]
  >();
  let parsedResponseString = null;
  const fromChain = useSelector(({ route }: RootState) => route.fromChain);
  const toChain = useSelector(({ route }: RootState) => route.toChain);
  const responseString = useSelector(
    ({ route }: RootState) => route.responseString
  );
  useEffect(() => {
    if (responseString !== "") {
      parsedResponseString = JSON.parse(responseString);
    }
  }, [responseString]);
  const akkaContract = useAkkaContract();
  // const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const addTransaction = useTransactionAdder();
  const inputAmount = useSelector(({ route }: RootState) => route.amount);
  return useMemo(() => {
    const sufficientBalance = inputAmount;
    return {
      quoteLayerZeroFee: async (payload) => {
        const fee = await callWithoutGasPrice(
          akkaContract,
          "quoteLayerZeroFee",
          [
            parsedResponseString.data.routes.operations_seperated[1]
              .operations[0].contract_addr,
            parsedResponseString.data.routes.operations_seperated[1].operations
              .ask_bridge_data.chain_id,
            "0xa9e70F8134C500b09353Efb0b39f4f67cA2608eb",
            payload,
            parsedResponseString.data.routes.operations_seperated[2].gas_fee,
          ] as unknown as Parameters<typeof akkaContract.quoteLayerZeroFee>[],
          {
            gasLimit: 21000000,
          }
        );
        return fee as [BigNumber, BigNumber];
      },
      inputError: sufficientBalance ? undefined : "Insufficient BNB balance",
    };
  }, [akkaContract, chainId, inputAmount, addTransaction, callWithoutGasPrice]);
}
export function useAkkaAggrigatorSwapCallback(): {
  aggrigatorSwap?:
  | undefined
  | ((swapDescription: SwapDescriptionStruct, fee: BigNumber, payload: string) => Promise<TransactionResponse>);
  inputError?: string;
} {
  let parsedResponseString = null;
  const fromChain = useSelector(({ route }: RootState) => route.fromChain);
  const toChain = useSelector(({ route }: RootState) => route.toChain);
  const responseString = useSelector(
    ({ route }: RootState) => route.responseString
  );
  useEffect(() => {
    if (responseString !== "") {
      parsedResponseString = JSON.parse(responseString);
    }
  }, [responseString]);

  const wallet = useSelector(({ account }: RootState) => account.wallet);
  const { useChainId } = useWallet(wallet);
  const chainId = useChainId();
  const { callWithoutGasPrice,callWithGasPrice } = useCallWithoutGasPrice<
    AkkaAggrigator,
    TransactionResponse
  >();
  const akkaContract = useAkkaContract();
  // const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const addTransaction = useTransactionAdder();
  const inputAmount = useSelector(({ route }: RootState) => route.amount);
  return useMemo(() => {
    const sufficientBalance = inputAmount;
    return {
      aggrigatorSwap: async (swapDescription, fee, payload) => {
        console.log({swapDescription});

        const tx = await callWithGasPrice(
          akkaContract,
          "aggrigatorSwap",
          [
            swapDescription,
            payload,
          ] as SwapDescriptionStruct[],
          {
            value: fee ? fee.toString() : undefined,
          }
        );
        addTransaction(tx, {
          summary: `swap ${inputAmount}`,
          type: "swap",
        });
        return tx as TransactionResponse;
      },
      inputError: sufficientBalance ? undefined : "Insufficient token balance",
    };
  }, [akkaContract, chainId, inputAmount, addTransaction, callWithoutGasPrice]);
}
