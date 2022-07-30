import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { useTokenContract } from "./useContract";

function useTokenBalance(
    tokenAdress?: string,
    owner?: string
): BigNumber | undefined {
    const contract = useTokenContract(tokenAdress);
    const [balance, setBalance] = useState<BigNumber>(undefined);

    useEffect(() => {
        if (owner && tokenAdress) {

            contract.balanceOf(owner).then((data) => {
                setBalance(data);
            });
        }
    }, [owner, tokenAdress]);

    return useMemo(
        () => (tokenAdress && balance ? balance : undefined),
        [tokenAdress, balance]
    );
}

export default useTokenBalance;