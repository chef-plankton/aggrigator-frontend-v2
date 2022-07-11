import { Contract } from "@ethersproject/contracts";
import type { Signer } from "@ethersproject/abstract-signer";
import type { Provider } from "@ethersproject/providers";
import { AddressZero } from "@ethersproject/constants";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";

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
  return new Contract(address, ABI, signer);
}

export function getBscScanLink(
  data: string | number,
  type: "transaction" | "token" | "address" | "block" | "countdown",
): string {
  switch (type) {
    case "transaction": {
      return `${'https://testnet.bscscan.com'}/tx/${data}`;
    }
    case "token": {
      return `${'https://testnet.bscscan.com'}/token/${data}`;
    }
    case "block": {
      return `${'https://testnet.bscscan.com'}/block/${data}`;
    }
    case "countdown": {
      return `${'https://testnet.bscscan.com'}/block/countdown/${data}`;
    }
    default: {
      return `${'https://testnet.bscscan.com'}/address/${data}`;
    }
  }
}
