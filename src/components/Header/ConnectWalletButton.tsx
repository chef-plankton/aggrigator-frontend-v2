import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { RootState } from "../../app/store";
import {
  changeModalStatus,
  connectWalletStatus,
} from "../../features/modals/modalsSlice";
import summarizeString from "../../hooks/summarizeString";
import useWallet from "../Wallets/useWallet";

function ConnectWalletButton() {
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
  const account = useAccount();

  const dispatch = useDispatch();
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  return (
    <button
      onClick={() => {
        dispatch(connectWalletStatus(true));
      }}
      className={`py-2 px-5 font-clash font-[400] text-[16px] text-white border-[2px] border-white border-solid hover:border-[2px] hover:border-[#814AFB]`}
    >
      {isActive ? summarizeString(account, 6, "...") : "Connnect Wallet"}
    </button>
  );
}

export default ConnectWalletButton;
