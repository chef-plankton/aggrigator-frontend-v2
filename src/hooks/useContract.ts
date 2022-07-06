import { useMemo } from "react";
// Imports below migrated from Exchange useContract.ts
import { Contract } from "@ethersproject/contracts";
import { ERC20_BYTES32_ABI } from "../config/abi/erc20";
import ERC20_ABI from "../config/abi/erc20.json";
import WETH_ABI from "../config/abi/weth.json";
import { getBep20Contract } from "../utils/contractHelpers";
import { getContract, getProviderOrSigner } from "../utils";
import { hooks } from "../connectors/metaMask";
import { Erc20, Erc20Bytes32, Weth } from "../config/abi/types";
import { WETH } from "@pancakeswap/sdk";
/**
 * Helper hooks to get specific contracts (by ABI)
 */
export const useERC20 = (address: string, withSignerIfPossible = true) => {
  const { useAccounts, useProvider } = hooks;
  const library = useProvider();
  const account = useAccounts();
  const signer = useMemo(
    () =>
      withSignerIfPossible ? getProviderOrSigner(library, account[0]) : null,
    [withSignerIfPossible, library, account]
  );
  return useMemo(() => getBep20Contract(address, signer), [address, signer]);
};
export function useWBNBContract(
  withSignerIfPossible?: boolean
): Contract | null {
  const chainId = 97;
  return useContract<Weth>(
    chainId ? WETH[chainId].address : undefined,
    WETH_ABI,
    withSignerIfPossible
  );
}

// returns null on errors
function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { useAccounts, useProvider } = hooks;
  const library = useProvider();
  const account = useAccounts();
  const signer = useMemo(
    () =>
      withSignerIfPossible ? getProviderOrSigner(library, account[0]) : null,
    [withSignerIfPossible, library, account]
  );

  const canReturnContract = useMemo(
    () => address && ABI && (withSignerIfPossible ? library : true),
    [address, ABI, library, withSignerIfPossible]
  );

  return useMemo(() => {
    if (!canReturnContract) return null;
    try {
      return getContract(address, ABI, signer);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, signer, canReturnContract]) as T;
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
export function useBytes32TokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract<Erc20Bytes32>(
    tokenAddress,
    ERC20_BYTES32_ABI,
    withSignerIfPossible
  );
}
