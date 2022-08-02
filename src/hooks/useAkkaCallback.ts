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
import BigNumber from "bignumber.js";
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
  getBytes?: undefined | (() => Promise<string>);
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
      getBytes: async () => {
        const encodedData = await callWithoutGasPrice(
          akkaContract,
          "encodeSwapDescription",
          [
            {
              srcToken: parsedResponseString.data.routes.operations_seperated[0]
                .operations.offer_token[0]
                ? parsedResponseString.data.routes.operations_seperated[0]
                  .operations.offer_token[0]
                : "",
              dstToken: parsedResponseString.data.routes.operations_seperated[0]
                .operations[
                parsedResponseString.data.routes.operations_seperated[0]
                  .operations.length - 1
              ].ask_token[0]
                ? parsedResponseString.data.routes.operations_seperated[0]
                  .operations[
                  parsedResponseString.data.routes.operations_seperated[0]
                    .operations.length - 1
                ].ask_token[0]
                : "",
              srcDesiredAmount: parsedResponseString.data.input_amount
                ? parseEther(parsedResponseString.data.input_amount.toString())
                : "",
              dstDesiredMinAmount: parsedResponseString.data.return_amount
                ? parseEther(parsedResponseString.data.return_amount.toString())
                : "",
              to: parsedResponseString.data.routes.operations_seperated[0]
                .operations[
                parsedResponseString.data.routes.operations_seperated[0]
                  .operations.length - 1
              ].ask_token[0]
                ? parsedResponseString.data.routes.operations_seperated[0]
                  .operations[
                  parsedResponseString.data.routes.operations_seperated[0]
                    .operations.length - 1
                ].ask_token[0]
                : "",
              dstChainId: parsedResponseString.data.routes
                .operations_seperated[1].operations.ask_bridge_data.chain_id
                ? parsedResponseString.data.routes.operations_seperated[1]
                  .operations.ask_bridge_data.chain_id
                : 0,
              dstPoolId: parsedResponseString.data.routes
                .operations_seperated[1].operations.ask_bridge_data.pool_id
                ? parsedResponseString.data.routes.operations_seperated[1]
                  .operations.ask_bridge_data.pool_id
                : 0,
              srcPoolId: parsedResponseString.data.routes
                .operations_seperated[1].operations.offer_bridge_data.pool_id
                ? parsedResponseString.data.routes.operations_seperated[1]
                  .operations.offer_bridge_data.pool_id
                : 0,
              gasForSwap:
                parsedResponseString.data.routes.operations_seperated[0]
                  .gas_fee,
              dstContractAddress: parsedResponseString.data.routes
                .operations_seperated[0].operations[
                parsedResponseString.data.routes.operations_seperated[0]
                  .operations.length - 1
              ].ask_token[0]
                ? parsedResponseString.data.routes.operations_seperated[0]
                  .operations[
                  parsedResponseString.data.routes.operations_seperated
                    .operations.length - 1
                ].ask_token[0]
                : "",
              isRegularTransfer: fromChain !== toChain ? false : true,
              routes: [
                parsedResponseString.data.routes.operations_seperated[0]
                  .operations
                  ? parsedResponseString.data.routes.operations_seperated[0].operations.forEach(
                    (item: any) => ({
                      srcToken: item.offer_token[0],
                      dstToken: item.ask_token[0],
                      srcAmount: parsedResponseString.data.input_amount
                        ? parseEther(
                          parsedResponseString.data.input_amount.toString()
                        )
                        : "",
                      dstMinAmount: parsedResponseString.data.return_amount
                        ? parseEther(
                          parsedResponseString.data.return_amount.toString()
                        )
                        : "",
                      swapType: fromChain === toChain ? 1 : 2,
                      path: [item.offer_token[0], item.ask_token[0]],
                      router: item.router_addr ? item.router_addr : "",
                    })
                  )
                  : [],
              ],
            },
          ] as unknown as SwapDescriptionStruct[],
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
  const { callWithoutGasPrice } = useCallWithoutGasPrice<
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
        const tx = await callWithoutGasPrice(
          akkaContract,
          "aggrigatorSwap",
          [
            swapDescription,
            payload,
          ] as SwapDescriptionStruct[],
          {
            gasLimit: 21000000,
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
