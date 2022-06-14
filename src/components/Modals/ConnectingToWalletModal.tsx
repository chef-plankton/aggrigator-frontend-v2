import React, { FC } from "react";
import Modal from "react-modal";
import CloseIcon from "../../assets/img/close.png";
import MetaMaskCard from "../Wallets/MetaMaskCard";
import { hooks, metaMask } from "../../connectors/metaMask";
import DisconnectMetaMaskWallet from "../Wallets/DisconnectMetaMaskWallet";
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
    overflow: "scroll",
  },
};

Modal.setAppElement("#root");
interface Props {
  connectingWalletModalIsOpen: boolean;
  setConnectingWalletModalIsOpen: (value: boolean) => void;
}
function ConnectWalletModal({
  connectingWalletModalIsOpen,
  setConnectingWalletModalIsOpen,
}: Props) {
  function closeModal() {
    setConnectingWalletModalIsOpen(false);
  }
  return (
    <div>
      <Modal
        isOpen={connectingWalletModalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-between mb-5">Connecting...</div>
      </Modal>
    </div>
  );
}
export default ConnectWalletModal;
