import React, { FC } from "react";
import Modal from "react-modal";
import CloseIcon from "../assets/img/close.png";
import MetaMaskCard from "./../components/ConnectWallets/connectorCards/MetaMaskCard";
import WalletConnectCard from "./../components/ConnectWallets/connectorCards/WalletConnectCard";
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
    overflow: "hidden",
  },
};

Modal.setAppElement("#root");
interface Props {
  modalIsOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
function ConnectWalletModal({ modalIsOpen, setIsOpen }: Props) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-between mb-5">
          <div>
            <h4 className="font-bold">Connect a wallet</h4>
          </div>
          <div>
            <img
              src={CloseIcon}
              alt=""
              onClick={closeModal}
              className="cursor-pointer w-[20px]"
            />
          </div>
        </div>
        <div className="flex flex-col w-[100%]">
          <MetaMaskCard />
          <WalletConnectCard />
          {/* <div className="flex items-center justify-between border-[1px] rounded-xl border-[#D3D3D3] px-[12px] py-[15px] bg-[#edeef2] mb-2 cursor-pointer">
            <h6 className="font-semibold text-[16px]">MetaMask</h6>
            <div>
              <img
                src="https://app.uniswap.org/static/media/metamask.02e3ec27.png"
                alt=""
                className="w-[32px]"
              />
            </div>
          </div>
          <div className="flex items-center justify-between border-[1px] rounded-xl border-[#D3D3D3] px-[12px] py-[15px] bg-[#edeef2] mb-2 cursor-pointer">
            <h6 className="font-semibold text-[16px]">WalletConnect</h6>
            <div>
              <img
                src="https://app.uniswap.org/static/media/walletConnectIcon.304e3277.svg"
                alt=""
                className="w-[32px]"
              />
            </div>
          </div>
          <div className="flex items-center justify-between border-[1px] rounded-xl border-[#D3D3D3] px-[12px] py-[15px] bg-[#edeef2] mb-2 cursor-pointer">
            <h6 className="font-semibold text-[16px]">Binance Chain Wallet</h6>
            <div>
              <img
                src="https://assets-cdn.trustwallet.com/blockchains/smartchain/info/logo.png"
                alt=""
                className="w-[32px]"
              />
            </div>
          </div> */}
        </div>
        <div className="w-[100%] border-[1px] rounded-xl px-[12px] py-[15px] bg-[#edeef2] mt-2">
          <p className="text-[14px]">
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
