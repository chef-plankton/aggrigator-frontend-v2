import CloseIcon from "../../assets/img/close.png";
import MetaMaskCard from "./MetaMaskCard";
import DisconnectWallet from "./DisconnectWallet";
import WalletConnectCard from "./WalletConnectCard";
import { useDispatch } from "react-redux";
import { changeModalStatus } from "../../features/modals/modalsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import useWallet from "./useWallet";
import { metaMask } from "../../connectors/metaMask";
import { getAddChainParameters } from "../../chains";
import { changeWallet } from "../../features/account/accountSlice";
import { useState } from "react";
function ConnectWalletModal() {
  const dispatch = useDispatch();
  const wallet = useSelector(({ account }: RootState) => account.wallet);
  const {
    useChainId,
    useAccount,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = useWallet(wallet);
  const isActive = useIsActive();
  const isActivating = useIsActivating();
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const connectMetamaskHandler = () => {
    setIsLoading(true)
    metaMask
      .activate(getAddChainParameters(chainId))
      .then(() => {
        dispatch(changeWallet("metamask"));
        dispatch(changeModalStatus(false));
        void metaMask.connectEagerly().catch(() => {
          console.debug("Failed to connect eagerly to metamask");
        });
        setIsLoading(false)
      })
      .catch(console.error);
  };
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
        {isActive ? (
          <DisconnectWallet />
        ) : isLoading ? (
          "Loading..."
        ) : (
          <>
            {typeof window.ethereum !== "undefined" ? (
              <MetaMaskCard handleClick={connectMetamaskHandler} />
            ) : (
              ""
            )}
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
