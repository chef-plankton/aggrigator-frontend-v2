import { useCallback } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { Contract, CallOverrides } from "@ethersproject/contracts";
import get from "lodash/get";
import { BigNumber, ethers } from "ethers";
import useWallet from "../components/Wallets/useWallet";
export function useCallWithoutGasPrice<T extends Contract, U>() {
  /**
   * Perform a contract call with a gas price returned from useGasPrice
   * @param contract Used to perform the call
   * @param methodName The name of the method called
   * @param methodArgs An array of arguments to pass to the method
   * @param overrides An overrides object to pass to the method. gasPrice passed in here will take priority over the price returned by useGasPrice
   * @returns https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
   */

  const callWithoutGasPrice = useCallback(
    async (
      contract: T,
      methodName: keyof T,
      methodArgs: any[] = [],
      overrides: CallOverrides = null
    ): Promise<U | TransactionResponse> => {
      const contractMethod = get(contract, methodName);
      const tx = await contractMethod(...methodArgs, { ...overrides });
      return tx;
    },
    []
  );

  const callWithGasPrice = useCallback(
    async (
      contract: T,
      methodName: keyof T,
      methodArgs: any[] = [],
      overrides: CallOverrides = null
    ): Promise<U | TransactionResponse> => {
      const contractMethod = get(contract, methodName);
      const estimateGas = await contract.estimateGas[methodName as string](
        ...methodArgs,
        { ...overrides }
      );

      const tx = await contractMethod(...methodArgs, {
        ...overrides,
        gasLimit: calculateGasMargin(estimateGas),
      });
      return tx;
    },
    []
  );

  return { callWithoutGasPrice, callWithGasPrice };
}
export function calculateGasMargin(value: BigNumber, margin = 1000): BigNumber {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(margin)))
    .div(BigNumber.from(10000));
}
