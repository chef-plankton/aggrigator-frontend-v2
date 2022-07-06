import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import type { Signer } from "@ethersproject/abstract-signer";
import type { Provider } from "@ethersproject/providers";
import { AddressZero } from "@ethersproject/constants";
import { getAddress } from "@ethersproject/address";
import { simpleRpcProvider } from "./providers";
import { memoize } from "lodash";

export const isAddress = memoize((value: any): string | false => {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
});
// account is not optional
export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}
// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}
// account is optional
export function getContract(
  address: string,
  ABI: any,
  signer?: Signer | Provider
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, signer ?? simpleRpcProvider);
}
