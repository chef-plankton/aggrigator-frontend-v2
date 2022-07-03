import React, { useEffect } from "react";
import CloseIcon from "../../assets/img/close.png";
import MetaMaskCard from "./MetaMaskCard";
import DisconnectWallet from "./DisconnectWallet";
import WalletConnectCard from "./WalletConnectCard";
import { hooks as metamaskhooks, metaMask } from "../../connectors/metaMask";
import {
  hooks as walletconnecthooks,
  walletConnect,
} from "../../connectors/walletConnect";
import { useDispatch } from "react-redux";
import { changeModalStatus } from "../../features/modals/modalsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
function ConnectWalletModal() {
  const dispatch = useDispatch();
  const {
    useIsActive: metamaskUseIsActive,
    useIsActivating: metamaskUseIsActivating,
  } = metamaskhooks;
  const metamaskIsActive = metamaskUseIsActive();

  const {
    useIsActive: walletconnectUseIsActive,
    useIsActivating: walletconnectUseIsActivating,
  } = walletconnecthooks;
  const walletconnectIsActive = walletconnectUseIsActive();
  const themeMode = useSelector(({ theme }: RootState) => theme.value);

  // Connect to Metamask wallet automatically after refreshing the page (attempt to connect eagerly on mount)
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
    void walletConnect.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, []);
  return (
    <>
      <div className="flex justify-between items-center mb-5 pr-5 pl-5 pt-5 pb-2">
        <div>
          <h4
            className={`font-medium ${
              themeMode === "light" ? "text-black" : "text-white"
            }`}
          >
            Connect a Wallet
          </h4>
        </div>
        <div>
          <img
            src={CloseIcon}
            alt=""
            onClick={() => dispatch(changeModalStatus(false))}
            className="cursor-pointer w-[15px]"
          />
        </div>
      </div>
      <div className="flex flex-col w-[100%] px-5">
        {metamaskIsActive || walletconnectIsActive ? (
          <DisconnectWallet />
        ) : (
          <>
            <MetaMaskCard />
            <WalletConnectCard />
          </>
        )}
      </div>
      <div className="px-5 pt-2 pb-5">
        <div className="w-[100%] border-[1px] rounded-xl px-[12px] py-[15px] bg-[#edeef2]">
          <p className="text-[14px]">
            By connecting a wallet, you agree to Akka Labs’ Terms of Service and
            acknowledge that you have read and understand the Akka Protocol
            Disclaimer.
          </p>
        </div>
      </div>
    </>
  );
}

export default ConnectWalletModal;
