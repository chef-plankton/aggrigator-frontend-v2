import { ChainId } from "../config/constants/types";

export default function useSetContractWithChainId(chainId: ChainId): string {
  if (chainId === ChainId.BSC) return process.env.REACT_APP_BSC_AKKA_CONTRACT;
  if (chainId === ChainId.FTM) return process.env.REACT_APP_FTM_AKKA_CONTRACT;
}
