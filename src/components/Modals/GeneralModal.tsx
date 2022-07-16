import Modal from "react-modal";
import { changeModalStatus } from "../../features/modals/modalsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ConnectWalletModal from "../Wallets/ConnectWalletModal";
import FromTokenlist from "../Main/From/FromTokenlist";
import FromNetworklist from "../Main/From/FromNetworklist";
import ToTokenlist from "../Main/To/ToTokenlist";
import ToNetworklist from "../Main/To/ToNetworklist";
import FromAdvanceSetting from "../Main/From/FromAdvanceSetting";

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
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  return (
    <div>
      <Modal
        isOpen={generalModal}
        onRequestClose={() => dispatch(changeModalStatus(false))}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 100,
          },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            right: "auto",
            bottom: "auto",
            width: "500px",
            minWidth: "500px",
            height: "auto",
            maxWidth: "420px",
            maxHeight: "90vh",
            marginRight: "-50%",
            padding: "0px",
            backgroundColor:
              themeMode === "light" ? "rgb(255, 255, 255)" : "rgb(35, 41, 49)",
            border:
              themeMode === "light"
                ? "1px solid rgb(247, 248, 250)"
                : "rgb(26, 30, 36)",
            boxShadow:
              themeMode === "light"
                ? "rgb(47 128 237 / 5%) 0px 4px 8px 10px"
                : "rgb(35 41 49 / 5%) 0px 4px 8px 10px",
            borderRadius: "10px",
            overflow: "hidden",
          },
        }}
        contentLabel="General Modal"
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
      </Modal>
    </div>
  );
}
export default GeneralModal;
