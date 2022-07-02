import useWallet from "../../../components/Wallets/useWallet";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useEffect, useState } from "react";
import { Web3ReactHooks } from "@web3-react/core";
import { BigNumber } from "ethers";
import { formatEther } from "@ethersproject/units";
function FromBalance() {
  function useBalances(
    provider?: ReturnType<Web3ReactHooks["useProvider"]>,
    accounts?: string[]
  ): BigNumber[] | undefined {
    const [balances, setBalances] = useState<BigNumber[] | undefined>();

    useEffect(() => {
      if (provider && accounts?.length) {
        let stale = false;

        void Promise.all(
          accounts.map((account) => provider.getBalance(account))
        ).then((balances) => {
          if (stale) return;
          setBalances(balances);
        });

        return () => {
          stale = true;
          setBalances(undefined);
        };
      }
    }, [provider, accounts]);

    return balances;
  }
  const walletName = useSelector(({ account }: RootState) => account.wallet);
  const hooks = useWallet(walletName);
  const { useIsActive, useAccounts, useProvider, useENSNames } = hooks;
  const isActive = useIsActive();
  const accounts = useAccounts();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);
  const balances = useBalances(provider, accounts);
  if (isActive && walletName === "metamask") {
    return (
      <div>
        {accounts.length === 0
          ? "None"
          : accounts?.map((account, i) => (
              <ul
                key={account}
                style={{
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {ENSNames?.[i] ?? account}
                {balances?.[i] ? ` (Ξ${formatEther(balances[i])})` : null}
              </ul>
            ))}
      </div>
    );
  }
  if (isActive && walletName === "walletconnect") {
    return <div>wall</div>;
  } else {
    return <div>Balance: -</div>;
  }
}

export default FromBalance;
