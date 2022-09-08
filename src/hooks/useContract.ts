import { useEffect, useMemo, useState } from "react";
// Imports below migrated from Exchange useContract.ts
import { Contract } from "@ethersproject/contracts";
import WETH_ABI from "../config/abi/weth.json";
import AKKA_ABI from "../config/abi/AkkaAggrigator.json";
import { getBep20Contract } from "../utils/contractHelpers";
import { getContract, getProviderOrSigner } from "../utils";
import { hooks } from "../connectors/metaMask";
import { AkkaAggrigator, Erc20, Weth } from "../config/abi/types";
import { WETH } from "@pancakeswap/sdk";
import ERC20_ABI from "../config/abi/erc20.json";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { ca } from "date-fns/locale";
import { ChainId } from "../config/constants/types";
import { setContractWithChainId } from "./useSetContractWithChainId";
// returns null on errors
function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { useAccount, useProvider } = hooks;
  const library = useProvider();
  const account = useAccount();
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
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
/**
 * Helper hooks to get specific contracts (by ABI)
 */
export const useERC20 = (address: string, withSignerIfPossible = true) => {
  const { useAccount, useProvider } = hooks;
  const library = useProvider();
  const account = useAccount();
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account]
  );
  return useMemo(() => getBep20Contract(address, signer), [address, signer]);
};

export function useWBNBContract(
  withSignerIfPossible?: boolean
): ReturnType<typeof useContract<Weth>> | null {
  const chainId = 97;
  return useContract<Weth>(
    chainId ? WETH[chainId].address : undefined,
    WETH_ABI,
    withSignerIfPossible
  );
}
export function useAkkaContract(
  withSignerIfPossible?: boolean
): ReturnType<typeof useContract<AkkaAggrigator>> | null {
  const [contractAddress, setContractAddress] = useState<string>(null);
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  console.log(chainId);

  useEffect(() => {
    if (chainId) {
      setContractAddress(setContractWithChainId(chainId));
    }
  }, [chainId]);
  return useContract(contractAddress, AKKA_ABI, withSignerIfPossible);
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
