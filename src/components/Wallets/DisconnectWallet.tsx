import forbiddenImg from "./../../assets/img/kindpng_94001.png";
import { hooks as metamaskhooks, metaMask } from "../../connectors/metaMask";
import {
  hooks as walletconnecthooks,
  walletConnect,
} from "../../connectors/walletConnect";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import useWallet from "./useWallet";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
function DisconnectWallet() {
  const walletName = useSelector(({ account }: RootState) => account.wallet);
  const hooks = useWallet(walletName);
  const { useIsActive } = hooks;
  const isActive = useIsActive();
  const dispatch = useAppDispatch();

  const disconnectwallet = () => {
    if (isActive && walletName === "metamask") {
      void metaMask.resetState();
    }
    if (isActive && walletName === "walletconnect") {
      void walletConnect.deactivate();
    }

  };
  return (
    <div
      className="flex items-center justify-between text-white border-[1px] border-[white] px-[12px] py-[15px] mb-2 cursor-pointer"
      onClick={() => disconnectwallet()}
    >
      <h6 className="font-medium text-[16px]">
        You Need to disconnect your current wallet before connect with a new
        wallet
      </h6>
      <div>
        <img src={forbiddenImg} alt="" className="w-[32px]" />
      </div>
    </div>
  );
}

export default DisconnectWallet;
