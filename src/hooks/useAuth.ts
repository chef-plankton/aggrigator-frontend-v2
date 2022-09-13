import { wait } from "@testing-library/user-event/dist/utils";
import { Web3ReactHooks } from "@web3-react/core";
import { AddEthereumChainParameter } from "@web3-react/types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { metaMask } from "../connectors/metaMask";
import { walletConnect } from "../connectors/walletConnect";
import {
  changeAddress,
  changeWallet,
  WalletName,
} from "../features/account/accountSlice";
import { changeChain } from "../features/chains/chainsSlice";
import { changeModalStatus } from "../features/modals/modalsSlice";
import { changeFromChain } from "../features/route/routeSlice";
interface useAuthReturn {
  login: (
    desiredChainIdOrChainParameters?: number | AddEthereumChainParameter,
    chainId?: number,
    walletName?: WalletName
  ) => Promise<void>;
}

const useAuth = ({ useAccount, useChainId }: Web3ReactHooks): useAuthReturn => {
  const dispatch = useDispatch();
  const account = useAccount();
  const walletChainId = useChainId();
  const appChainId = useSelector(({ chains }: RootState) => chains.value);

  const login = useCallback(
    async (
      desiredChainIdOrChainParameters: number | AddEthereumChainParameter,
      chainId: number,
      walletName: WalletName
    ) => {
      if (walletName === "metamask") {
        // const isWalletConnected = metaMask.provider.isConnected();
        // if (isWalletConnected) {
          await metaMask
            .activate(desiredChainIdOrChainParameters)
            .then(() => {
              dispatch(changeModalStatus(false));
              dispatch(changeChain(chainId));
              dispatch(changeFromChain(chainId));
              dispatch(changeWallet(walletName));
              dispatch(changeAddress(account));
            })
            .catch((err) => {
              console.debug(err);
            });
          await wait(500);
          await metaMask.connectEagerly().catch(() => {
            console.debug("Failed to connect eagerly to metamask");
          });
        // }
      }
      if (walletName === "walletconnect") {
        // const isWalletConnected = walletConnect.provider.isWalletConnect;
        // if (isWalletConnected) {
          await walletConnect
            .activate(chainId)
            .then(() => {
              dispatch(changeModalStatus(false));
              dispatch(changeChain(chainId));
              dispatch(changeFromChain(chainId));
              dispatch(changeWallet(walletName));
              dispatch(changeAddress(account));
            })
            .catch((err) => {
              console.debug(err);
            });
          await wait(500);
          await walletConnect.connectEagerly().catch(() => {
            console.debug("Failed to connect eagerly to walletconnect");
          });
        // }
      }
    },
    [dispatch, appChainId, walletChainId]
  );
  return { login };
};
export default useAuth;
