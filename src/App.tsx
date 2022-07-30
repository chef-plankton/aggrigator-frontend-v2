import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import GeneralModal from "./components/Modals/GeneralModal";
import useWallet from "./components/Wallets/useWallet";
import { metaMask } from "./connectors/metaMask";
import { walletConnect } from "./connectors/walletConnect";
import { changeWallet } from "./features/account/accountSlice";
import useAuth from "./hooks/useAuth";

function App() {
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const dispatch = useDispatch();

  useEffect(() => {
    
    void metaMask.connectEagerly().then(()=>{
      dispatch(changeWallet('metamask'))
    }).catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
    void walletConnect.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, [chainId]);


  const wallet = useSelector(({ account }: RootState) => account.wallet);
  const approvevalue = useSelector(
    ({ account }: RootState) => account.approvevalue
  );
  const {
    useChainId,
    useAccount,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = useWallet(wallet);
  const isActive=useIsActive()
  const wc=useChainId()
  console.log("matamask is active",isActive);
    console.log("wallet chainId",wc);
    console.log("app chainId",chainId);
  return (
    <>
      <Header />
      <Main />
      <GeneralModal />
    </>
  );
}

export default App;
