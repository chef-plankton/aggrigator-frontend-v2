import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { changeChain } from "../../features/chains/chainsSlice";
import { hooks as metamaskhooks, metaMask } from "../../connectors/metaMask";
import {
  hooks as walletconnecthooks,
  walletConnect,
} from "../../connectors/walletConnect";
import { getAddChainParameters } from "../../chains";
import bnblightIcon from "../../assets/img/chains/binance-light.svg";
import polygonIcon from "../../assets/img/chains/polygon.svg";
import fantomIcon from "../../assets/img/chains/fantom.svg";
interface Props {
  setDropdown: (value: boolean) => void;
}
function ChainsDropdown({ setDropdown }: Props) {
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const { useIsActive: metamaskUseIsActive } = metamaskhooks;
  const metamaskIsActive = metamaskUseIsActive();
  const { useIsActive: walletconnectUseIsActive } = walletconnecthooks;
  const walletconnectIsActive = walletconnectUseIsActive();
  const dispatch = useDispatch();
  const changeChainId = (chainid: number) => {
    if (metamaskIsActive) {
      dispatch(changeChain(chainid));
      metaMask.activate(getAddChainParameters(chainid));
    }
    if (walletconnectIsActive) {
      dispatch(changeChain(chainid));
      walletConnect.activate(chainid);
      console.log(walletConnect.activate(chainid));
    } else {
      dispatch(changeChain(chainid));
    }
  };
  return (
    <div className="z-10 bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 chainslistdrowdown">
      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
        <li>
          <div
            onClick={() => {
              changeChainId(56);
              setDropdown(false);
            }}
            className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          >
            <img src={bnblightIcon} alt="" className="w-[24px] mr-2" />
            BNB Chain
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              changeChainId(250);
              setDropdown(false);
            }}
            className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          >
            <img src={fantomIcon} alt="" className="w-[24px] mr-2" />
            Fantom
          </div>
        </li>

        <li>
          <div
            onClick={() => {
              changeChainId(97);
              setDropdown(false);
            }}
            className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          >
            <img src={bnblightIcon} alt="" className="w-[24px] mr-2" />
            BSC Testnet
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ChainsDropdown;
