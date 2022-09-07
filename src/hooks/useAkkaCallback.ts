import { TransactionResponse } from "@ethersproject/providers";
import { BigNumber, BytesLike } from "ethers";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import useWallet from "../components/Wallets/useWallet";
import { AkkaAggrigator } from "../config/abi/types";
import { SwapDescriptionStruct } from "../config/abi/types/AkkaAggrigator";
import { useTransactionAdder } from "../state/transactions/hooks";
import { useCallWithoutGasPrice } from "./useCallWithoutGasPrice";
import { useAkkaContract } from "./useContract";

export enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP,
}

const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE };

export function useAkkaEncodeSwapDescriptionCallback(): {
  getBytes?:
    | undefined
    | ((swapDescription: SwapDescriptionStruct) => Promise<string>);
  inputError?: string;
} {
  const wallet = useSelector(({ account }: RootState) => account.wallet);
  const { useChainId } = useWallet(wallet);
  const chainId = useChainId();
  const { callWithoutGasPrice, callWithGasPrice } = useCallWithoutGasPrice<
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
        const encodedData = await callWithGasPrice(
          akkaContract,
          "encodeSwapDescription",
          [swapDescription] as SwapDescriptionStruct[],
          {
            // gasLimit: 21000,
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
    | ((
        router: string,
        dstChainId: BigNumber,
        to: string,
        payload: BytesLike,
        gasForCall: BigNumber
      ) => Promise<[BigNumber, BigNumber]>);
  inputError?: string;
} {
  const { useAccount, useChainId } = useWallet("metamask");
  const chainId = useChainId();
  const account = useAccount();
  const { callWithoutGasPrice, callWithGasPrice } = useCallWithoutGasPrice<
    AkkaAggrigator,
    [BigNumber, BigNumber]
  >();
  let parsedResponseString = null;
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
      quoteLayerZeroFee: async (
        router,
        dstChainId,
        to,
        payload,
        gasForCall
      ) => {
        const fee = await callWithGasPrice(akkaContract, "quoteLayerZeroFee", [
          router,
          dstChainId,
          to,
          payload,
          gasForCall,
        ] as Parameters<typeof akkaContract.quoteLayerZeroFee>[]);
        return fee as [BigNumber, BigNumber];
      },
      inputError: sufficientBalance ? undefined : "Insufficient Token balance",
    };
  }, [akkaContract, chainId, inputAmount, addTransaction, callWithoutGasPrice]);
}
export function useAkkaAggrigatorSwapCallback(): {
  aggrigatorSwap?:
    | undefined
    | ((
        swapDescription: SwapDescriptionStruct,
        fee: BigNumber,
        payload: string
      ) => Promise<TransactionResponse>);
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
  const { callWithoutGasPrice, callWithGasPrice } = useCallWithoutGasPrice<
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
        const tx = await callWithGasPrice(
          akkaContract,
          "aggrigatorSwap",
          [swapDescription, payload] as SwapDescriptionStruct[],
          {
            // gasLimit: 1500000,
            value: fee ? fee : undefined,
          }
        );
        addTransaction(tx, {
          summary: `swap ${inputAmount}`,
          type: fromChain === toChain ? "swap" : "multichain-swap",
        });

        return tx as TransactionResponse;
      },
      inputError: sufficientBalance ? undefined : "Insufficient token balance",
    };
  }, [akkaContract, chainId, inputAmount, addTransaction, callWithoutGasPrice]);
}
