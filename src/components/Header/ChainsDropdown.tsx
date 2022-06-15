import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { changeChain } from "../../features/chains/chainsSlice";
import { hooks as metamaskhooks, metaMask } from "../../connectors/metaMask";
import {
  hooks as walletconnecthooks,
  walletConnect,
} from "../../connectors/walletConnect";
import { getAddChainParameters } from "../../chains";
function ChainsDropdown() {
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
    <div className='z-10 bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 chainslistdrowdown'>
      <ul className='py-1 text-sm text-gray-700 dark:text-gray-200'>
        <li>
          <div
            onClick={() => {
              changeChainId(56);
            }}
            className='flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
          >
            <img
              src='https://app.1inch.io/assets/images/network-logos/binance-light_2.svg'
              alt=''
              className='w-5 mr-1'
            />
            BNB Chain
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              changeChainId(137);
            }}
            className='flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
          >
            <img
              src='https://app.1inch.io/assets/images/network-logos/polygon.svg'
              alt=''
              className='w-5 mr-1'
            />
            Polygon
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ChainsDropdown;
