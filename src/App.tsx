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
import { changeAddress, changeWallet } from "./features/account/accountSlice";
import { changeFromChain } from "./features/route/routeSlice";
import useAuth from "./hooks/useAuth";

function App() {
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const dispatch = useDispatch();
  const wallet = useSelector(({ account }: RootState) => account.wallet);
  const { useAccount } = useWallet(wallet)
  const account = useAccount()
  useEffect(() => {

    void metaMask.connectEagerly().then(() => {
      dispatch(changeWallet('metamask'))
      dispatch(changeFromChain(chainId));

      dispatch(changeAddress(account));
    }).catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
    void walletConnect.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });



  }, [chainId]);

  return (
    <>
      <Header />
      <Main />
      <GeneralModal />
    </>
  );
}

export default App;
