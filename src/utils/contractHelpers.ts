import type { Signer } from "@ethersproject/abstract-signer";
import type { Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { Erc20, Weth } from "../config/abi/types";
import bep20Abi from "../config/abi/erc20.json";
import wethAbi from "../config/abi/weth.json";

export const getContract = (
  abi: any,
  address: string,
  signer?: Signer | Provider
) => {
  const signerOrProvider = signer;
  return new Contract(address, abi, signerOrProvider);
};

export const getBep20Contract = (
  address: string,
  signer?: Signer | Provider
) => {
  return getContract(bep20Abi, address, signer) as Erc20;
};

export const getWETHContract = (
  address: string,
  signer?: Signer | Provider
) => {
  return getContract(wethAbi, address, signer) as Weth;
};
