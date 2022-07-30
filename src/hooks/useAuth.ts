import { wait } from "@testing-library/user-event/dist/utils";
import { Web3ReactHooks } from "@web3-react/core";
import { AddEthereumChainParameter } from "@web3-react/types";
import { hexlify } from "ethers/lib/utils";
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getAddChainParameters } from "../chains";
import { metaMask } from "../connectors/metaMask";
import { walletConnect } from "../connectors/walletConnect";
import { changeWallet, WalletName } from "../features/account/accountSlice";
import { changeChain } from "../features/chains/chainsSlice";
interface useAuthReturn {
    login: (desiredChainIdOrChainParameters?: number | AddEthereumChainParameter, chainId?: number, walletName?: WalletName) => Promise<void>
}


const useAuth = (): useAuthReturn => {

    const dispatch = useDispatch();
    const appChainId = useSelector(({ chains }: RootState) => chains.value);

    const login = useCallback(async (desiredChainIdOrChainParameters: number | AddEthereumChainParameter, chainId: number, walletName: WalletName) => {
        if (walletName === 'metamask') {
            const isWalletConnected = metaMask.provider.isConnected()
            if (isWalletConnected) {
                return await metaMask.activate(desiredChainIdOrChainParameters).then(async () => {
                    dispatch(changeChain(chainId))
                    dispatch(changeWallet(walletName))
                    await wait(500)
                    void metaMask.connectEagerly().catch(() => {
                        console.debug("Failed to connect eagerly to metamask");
                    });
                }).catch((err) => {
                    console.error(err);
                })
            }
        }
        if (walletName === 'walletconnect') {
            const isWalletConnected = walletConnect.provider.isWalletConnect
            if (isWalletConnected) {
                return await walletConnect.activate(chainId).then(async () => {
                    dispatch(changeChain(chainId))
                    dispatch(changeWallet(walletName))
                    await wait(500)
                    void walletConnect.connectEagerly().catch(() => {
                        console.debug("Failed to connect eagerly to metamask");
                    });
                }).catch((err) => {
                    console.error(err);
                })
            }
        }
    }, [dispatch, appChainId])
    return { login }
}
export default useAuth