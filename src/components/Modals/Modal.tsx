import React, { FC } from "react";
import Modal from "react-modal";
import CloseIcon from "../../assets/img/close.png";
import MetaMaskCard from "../Wallets/MetaMaskCard";
import DisconnectWallet from "../Wallets/DisconnectWallet";
import WalletConnectCard from "../Wallets/WalletConnectCard";
import { hooks as metamaskhooks } from "../../connectors/metaMask";
import { hooks as walletconnecthooks } from "../../connectors/walletConnect";
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    right: "auto",
    bottom: "auto",
    width: "500px",
    height: "400px",
    maxWidth: "420px",
    maxHeight: "90vh",
    marginRight: "-50%",
    padding: "20px",
    backgroundColor: "rgb(255, 255, 255)",
    border: "1px solid rgb(247, 248, 250)",
    boxShadow: "rgb(47 128 237 / 5%) 0px 4px 8px 10px",
    borderRadius: "20px",
  },
};

Modal.setAppElement("#root");
interface Props {
  connectWalletModalIsOpen: boolean;
  setConnectWalletModalIsOpen: (value: boolean) => void;
}
function ConnectWalletModal({
  connectWalletModalIsOpen,
  setConnectWalletModalIsOpen,
}: Props) {
  const { useIsActive: metamaskUseIsActive } = metamaskhooks;
  const metamaskIsActive = metamaskUseIsActive();
  const { useIsActive: walletconnectUseIsActive } = walletconnecthooks;
  const walletconnectIsActive = walletconnectUseIsActive();
  function closeModal() {
    setConnectWalletModalIsOpen(false);
  }
  return (
    <div>
      <Modal
        isOpen={connectWalletModalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='flex justify-between mb-5'>
          <div>
            <h4 className='font-bold'>Connect a wallet</h4>
          </div>
          <div>
            <img
              src={CloseIcon}
              alt=''
              onClick={closeModal}
              className='cursor-pointer w-[20px]'
            />
          </div>
        </div>
        <div className='flex flex-col w-[100%]'>
          {metamaskIsActive || walletconnectIsActive ? (
            <DisconnectWallet />
          ) : (
            <>
              <MetaMaskCard />
              <WalletConnectCard />
            </>
          )}
        </div>
        <div className='w-[100%] border-[1px] rounded-xl px-[12px] py-[15px] bg-[#edeef2] mt-2'>
          <p className='text-[14px]'>
            By connecting a wallet, you agree to Akka Labs’ Terms of Service and
            acknowledge that you have read and understand the Akka Protocol
            Disclaimer.
          </p>
        </div>
      </Modal>
    </div>
  );
}
export default ConnectWalletModal;
