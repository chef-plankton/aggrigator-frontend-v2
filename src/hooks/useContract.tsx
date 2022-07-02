import { useMemo } from "react";
// Imports below migrated from Exchange useContract.ts
import { Contract } from "@ethersproject/contracts";
import { ERC20_BYTES32_ABI } from "../config/abi/erc20";
import ERC20_ABI from "../config/abi/erc20.json";
import WETH_ABI from "../config/abi/weth.json";
import { getBep20Contract } from "../utils/contractHelpers";
import { getProviderOrSigner } from "../utils";
import { hooks } from "../connectors/metaMask";

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
