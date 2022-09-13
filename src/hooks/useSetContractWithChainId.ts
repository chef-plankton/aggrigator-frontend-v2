import { ChainId } from "../config/constants/types";

export function setContractWithChainId(chainId: ChainId): string {
  if (chainId === ChainId.BSC) return process.env.REACT_APP_BSC_AKKA_CONTRACT;
  if (chainId === ChainId.FTM) return process.env.REACT_APP_FTM_AKKA_CONTRACT;
}
export function dstSetContractWithChainId(chainId: ChainId): string {
  if (chainId === ChainId.BSC)
    return process.env.REACT_APP_BSC_AKKA_RECEIVER_CONTRACT;
  if (chainId === ChainId.FTM)
    return process.env.REACT_APP_FTM_AKKA_RECEIVER_CONTRACT;
}
