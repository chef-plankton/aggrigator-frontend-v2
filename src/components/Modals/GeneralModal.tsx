import Modal from "react-modal";
import {
  changeModalStatus,
  SuccessModalStateStatus,
} from "../../features/modals/modalsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ConnectWalletModal from "../Wallets/ConnectWalletModal";
import FromTokenlist from "../Main/From/FromTokenlist";
import FromNetworklist from "../Main/From/FromNetworklist";
import ToTokenlist from "../Main/To/ToTokenlist";
import ToNetworklist from "../Main/To/ToNetworklist";
import FromAdvanceSetting from "../Main/From/FromAdvanceSetting";
import { isMobile } from "react-device-detect";
import SuccessTransactionModal from "./SuccessTransactionModal";
import FailedTransactionModal from "./FailedTransactionModal";

Modal.setAppElement("#root");

function GeneralModal() {
  const dispatch = useDispatch();
  const generalModal = useSelector(
    ({ modals }: RootState) => modals.generalModal
  );
  const connectWalletModal = useSelector(
    ({ modals }: RootState) => modals.connectWalletModal
  );
  const fromTokenlistModal = useSelector(
    ({ modals }: RootState) => modals.fromTokenlistModal
  );
  const fromNetworklistModal = useSelector(
    ({ modals }: RootState) => modals.fromNetworklistModal
  );
  const ToTokenlistModal = useSelector(
    ({ modals }: RootState) => modals.ToTokenlistModal
  );
  const ToNetworklistModal = useSelector(
    ({ modals }: RootState) => modals.ToNetworklistModal
  );
  const fromAdvanceSettingModal = useSelector(
    ({ modals }: RootState) => modals.fromAdvanceSettingModal
  );
  const successModalState = useSelector(
    ({ modals }: RootState) => modals.SuccessModalState
  );
  const failedModalState = useSelector(
    ({ modals }: RootState) => modals.FailedModalState
  );
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  return (
    <div>
      <Modal
        isOpen={generalModal}
        onRequestClose={() => dispatch(changeModalStatus(false))}
        style={{
          overlay: {
            backgroundColor: "rgba(34, 34, 61, 0.7)",
            zIndex: 100,
          },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            right: "auto",
            bottom: "auto",
            width: isMobile ? "90%" : "500px",
            minWidth: isMobile ? "90%" : "500px",
            height: "auto",
            maxWidth: "420px",
            maxHeight: "90vh",
            marginRight: "-50%",
            padding: "24px",
            borderRadius: "5px",
            backgroundColor:
              themeMode === "light" ? "#171629" : "rgb(35, 41, 49)",
            border: "none",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
        contentLabel='General Modal'
      >
        {/* Check if needs to show Connect wallet modal */}
        {connectWalletModal ? <ConnectWalletModal /> : ""}
        {/* Check if needs to show from token list modal */}
        {fromTokenlistModal ? <FromTokenlist /> : ""}
        {/* Check if needs to show from network list modal */}
        {fromNetworklistModal ? <FromNetworklist /> : ""}
        {/* Check if needs to show to token list modal */}
        {ToTokenlistModal ? <ToTokenlist /> : ""}
        {/* Check if needs to show to network list modal */}
        {ToNetworklistModal ? <ToNetworklist /> : ""}
        {/* Check if needs to show to advance setting modal */}
        {fromAdvanceSettingModal ? <FromAdvanceSetting /> : ""}
        {/* Check if needs to show to success ttansaction modal */}
        {successModalState.status ? <SuccessTransactionModal /> : ""}
        {/* Check if needs to show to failed ttansaction modal */}
        {failedModalState.status ? <FailedTransactionModal /> : ""}
      </Modal>
    </div>
  );
}
export default GeneralModal;
