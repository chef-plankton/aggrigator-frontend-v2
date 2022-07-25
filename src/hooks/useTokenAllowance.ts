import { Currency, CurrencyAmount, Token, TokenAmount } from "@pancakeswap/sdk";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";

import { useERC20, useTokenContract } from "./useContract";

function useTokenAllowance(
  tokenAdress?: string,
  owner?: string,
  spender?: string
): BigNumber | undefined {
  console.log("tokenAdress: ", tokenAdress);
  console.log("owner: ", owner);
  console.log("spender: ", spender);

  const contract = useERC20(tokenAdress);
  const [allowance, setAllowance] = useState<BigNumber>(undefined);

  useEffect(() => {
    console.log("saaaaaaaalaaaaaaaaaaaaaaaaaam");
    
    if (owner && tokenAdress && spender) {
      contract.allowance(owner, spender).then((data) => {
        setAllowance(data);
      });
    }
  }, [owner, tokenAdress, spender]);

  return useMemo(
    () => (tokenAdress && allowance ? allowance : undefined),
    [tokenAdress, allowance]
  );
}

export default useTokenAllowance;
