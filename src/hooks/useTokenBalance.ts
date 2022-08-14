import { BigNumber, ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import useWallet from "../components/Wallets/useWallet";
import { useTokenContract } from "./useContract";

function useTokenBalance(
  tokenAdress?: string,
  owner?: string
): BigNumber | undefined {
  const wallet = useSelector(({ account }: RootState) => account.wallet);
  const [balance, setBalance] = useState<BigNumber>(undefined);
  const { useProvider, useAccount } = useWallet(wallet);
  const provider = useProvider();
  const contract = useTokenContract(tokenAdress);

  useEffect(() => {
    if (owner && tokenAdress) {
      if (
        tokenAdress === "0x0000000000000000000000000000000000000000" ||
        tokenAdress === "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83" ||
        tokenAdress === "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
      ) {
        provider.getBalance(owner).then((balance) => {
          // const balanceInEth = ethers.utils.formatEther(balance);
          // console.log(`balance: ${balanceInEth} Native token`);
          setBalance(balance);
        });
      } else {
        contract.balanceOf(owner).then((data) => {
          setBalance(data);
        });
      }
    }
  }, [owner, tokenAdress]);

  return useMemo(
    () => (tokenAdress && balance ? balance : undefined),
    [tokenAdress, balance, owner]
  );
}

export default useTokenBalance;
