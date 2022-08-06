import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import useWallet from "../components/Wallets/useWallet";

export default function useSetContractWithChainId(): string {
  const wallet = useSelector(({ account }: RootState) => account.wallet);
  const { useChainId } = useWallet(wallet);
  const chainId = useChainId();
  if (chainId === 56) return process.env.REACT_APP_BSC_AKKA_CONTRACT;
  if (chainId === 250) return process.env.REACT_APP_FTM_AKKA_CONTRACT;
}
