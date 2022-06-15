import { useEffect, useState } from "react";
import type { BigNumber } from "@ethersproject/bignumber";
import { hooks, walletConnect } from "../../../connectors/walletConnect";
import { Web3ReactHooks } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";
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
function FromWalletConnectBalance() {
  const {
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = hooks;
  const accounts = useAccounts();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);
  const balances = useBalances(provider, accounts);
  if (accounts === undefined) return null;
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

export default FromWalletConnectBalance;
