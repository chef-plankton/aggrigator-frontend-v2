import { wait } from "@testing-library/user-event/dist/utils";
import { Web3ReactHooks } from "@web3-react/core";
import { AddEthereumChainParameter } from "@web3-react/types";
import { hexlify } from "ethers/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getAddChainParameters } from "../chains";
import { metaMask } from "../connectors/metaMask";
import { walletConnect } from "../connectors/walletConnect";
import {
  changeAddress,
  changeWallet,
  WalletName,
} from "../features/account/accountSlice";
import { changeChain } from "../features/chains/chainsSlice";
import { changeModalStatus } from "../features/modals/modalsSlice";
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
        const isWalletConnected = metaMask.provider.isConnected();

        if (isWalletConnected) {
          await metaMask.activate(desiredChainIdOrChainParameters);
          dispatch(changeModalStatus(false));
          dispatch(changeChain(chainId));

          dispatch(changeWallet(walletName));
          dispatch(changeAddress(account));
          await wait(500);

          await metaMask.connectEagerly().catch(() => {
            console.debug("Failed to connect eagerly to metamask");
          });
          // return await metaMask
          //   .activate(desiredChainIdOrChainParameters)
          //   .then(async () => {
          //     dispatch(changeModalStatus(false));
          //     dispatch(changeChain(chainId));
          //     dispatch(changeWallet(walletName));
          //     console.log("account", account);
          //     dispatch(changeAddress(account));
          //     await wait(500);
          //     void metaMask.connectEagerly().catch(() => {
          //       console.debug("Failed to connect eagerly to metamask");
          //     });
          //   })
          //   .catch((err) => {
          //     console.error(err);
          //   });
        }
      }
      if (walletName === "walletconnect") {
        const isWalletConnected = walletConnect.provider.isWalletConnect;
        if (isWalletConnected) {
          // walletConnect.provider=null
          // return await walletConnect.provider.connect()
          await walletConnect.activate(chainId);
          dispatch(changeModalStatus(false));
          dispatch(changeChain(chainId));
          dispatch(changeWallet(walletName));
          dispatch(changeAddress(account));
          await wait(500);

          await walletConnect.connectEagerly().catch(() => {
            console.debug("Failed to connect eagerly to metamask");
          });
        }
      }
    },
    [dispatch, appChainId, walletChainId]
  );
  return { login };
};
export default useAuth;
