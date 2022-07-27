import { useEffect, useMemo } from "react";
import { useTransactionAdder } from "../state/transactions/hooks";
import { useAkkaContract } from "./useContract";
import { useCallWithoutGasPrice } from "./useCallWithoutGasPrice";
import useWallet from "../components/Wallets/useWallet";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { AkkaAggrigator } from "../config/abi/types";
import { SwapDescriptionStruct } from "../config/abi/types/Aggr";
import { parseEther, parseUnits } from "@ethersproject/units";
import BigNumber from "bignumber.js";
import {
  TransactionReceipt,
  TransactionResponse,
} from "@ethersproject/providers";
import { forEach } from "lodash";

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
  const { useAccount, useChainId } = useWallet("metamask");
  const chainId = useChainId();
  const account = useAccount();
  const { callWithoutGasPrice } = useCallWithoutGasPrice<
    AkkaAggrigator,
    string
  >();
  const akkaContract = useAkkaContract();
  // const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const addTransaction = useTransactionAdder();
  const inputAmount = useSelector(({ route }: RootState) => route.amount);
  return useMemo(() => {
    const sufficientBalance = inputAmount;
    return {
      getBytes: async () => {
        const encodedData = await callWithoutGasPrice(
          akkaContract,
          "encodeSwapDescription",
          [
            {
              srcToken: "0x8f9271DEE5708584cd9dffFbE5DAaA81585C33F2",
              dstToken: "0x8f9271DEE5708584cd9dffFbE5DAaA81585C33F2",
              srcDesiredAmount: parseUnits("1.0", 6),
              dstDesiredMinAmount: parseEther("0"),
              to: "0x8f9271DEE5708584cd9dffFbE5DAaA81585C33F2",
              dstChainId: 10009,
              dstPoolId: 1,
              srcPoolId: 1,
              gasForSwap: 1105617,
              dstContractAddress: "0x8f9271DEE5708584cd9dffFbE5DAaA81585C33F2",
              isRegularTransfer: true,
              routes: [
                {
                  srcToken: "0x8f9271DEE5708584cd9dffFbE5DAaA81585C33F2",
                  dstToken: "0x8f9271DEE5708584cd9dffFbE5DAaA81585C33F2",
                  srcAmount: parseUnits("1.0", 6),
                  dstMinAmount: parseEther("0.0"),
                  swapType: 2,
                  path: [
                    "0x8f9271DEE5708584cd9dffFbE5DAaA81585C33F2",
                    "0x8f9271DEE5708584cd9dffFbE5DAaA81585C33F2",
                  ],
                  router: "0x8f9271DEE5708584cd9dffFbE5DAaA81585C33F2",
                },
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
            "0xbB0f1be1E9CE9cB27EA5b0c3a85B7cc3381d8176",
            10001,
            "0x82A0F5F531F9ce0df1DF5619f74a0d3fA31FF561",
            payload,
            2105617,
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
    | ((fee: BigNumber, payload: string) => Promise<TransactionResponse>);
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

  const { useAccount, useChainId } = useWallet("metamask");
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
      aggrigatorSwap: async (fee, payload) => {
        const tx = await callWithoutGasPrice(
          akkaContract,
          "aggrigatorSwap",
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
              gasForSwap: 2105617,
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
                      (item) => ({
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
                        swapType: fromChain !== toChain ? 1 : 2,
                        path: item.path,
                        router: item.router,
                      })
                    )
                  : [],
              ],
            },
            payload,
          ] as unknown as SwapDescriptionStruct[],
          {
            gasLimit: 21000000,
            value: fee ? fee.toString() : undefined,
          }
        );
        addTransaction(tx, {
          summary: `swap ${inputAmount}`,
          type: "wrap",
        });
        return tx as TransactionResponse;
      },
      inputError: sufficientBalance ? undefined : "Insufficient BNB balance",
    };
  }, [akkaContract, chainId, inputAmount, addTransaction, callWithoutGasPrice]);
}
