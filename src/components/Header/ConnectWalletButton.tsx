import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { hooks, metaMask } from "../../connectors/metaMask";
import {
  changeModalStatus,
  connectWalletStatus,
} from "../../features/modals/modalsSlice";
import summarizeString from "../../hooks/summarizeString";

function ConnectWalletButton() {
  const {
    useChainId,
    useAccount,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = hooks;
  const isActive = useIsActive();
  const account = useAccount();

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
      {isActive ? summarizeString(account, 6, "...") : "Connnect Wallet"}
    </button>
  );
}

export default ConnectWalletButton;
