import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { hooks, metaMask } from "../../connectors/metaMask";
import {
  changeModalStatus,
  connectWalletStatus,
} from "../../features/modals/modalsSlice";

function ConnectWalletButton() {
  const {
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = hooks;
  const isActive = useIsActive();
  const accounts = useAccounts();

  const dispatch = useDispatch();
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  return (
    <button
      onClick={() => {
        dispatch(connectWalletStatus(true));
      }}
      className={`py-2 px-2 font-medium text-white ${
        themeMode === "light"
          ? "bg-[#111111] hover:bg-[#ffffff] hover:text-[#111111]"
          : "bg-[#4ECCA3] hover:bg-[#79d8b8]"
      } rounded transition duration-300`}
    >
      {isActive ? accounts : "Connnect Wallet"}
    </button>
  );
}

export default ConnectWalletButton;
