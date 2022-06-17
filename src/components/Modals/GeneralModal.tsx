import React, { FC } from "react";
import Modal from "react-modal";
import { changeModalStatus } from "../../features/modals/modalsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ConnectWalletModal from "./ConnectWalletModal";
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

function GeneralModal() {
  const dispatch = useDispatch();
  const generalModal = useSelector(
    ({ modals }: RootState) => modals.generalModal
  );
  const connectWalletModal = useSelector(
    ({ modals }: RootState) => modals.connectWalletModal
  );

  return (
    <div>
      <Modal
        isOpen={generalModal}
        onRequestClose={() => dispatch(changeModalStatus(false))}
        style={customStyles}
        contentLabel='General Modal'
      >
        {connectWalletModal ? <ConnectWalletModal /> : ""}
      </Modal>
    </div>
  );
}
export default GeneralModal;
