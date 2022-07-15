import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../index";
import { checkedTransaction, finalizeTransaction } from "./actions";
import useWallet from "../../components/Wallets/useWallet";
import Swal from "sweetalert2";
import { RootState } from "../../app/store";
import { useCurrentBlock } from "../../components/Main/Main";

export function shouldCheck(
  currentBlock: number,
  tx: { addedTime: number; receipt?: any; lastCheckedBlockNumber?: number }
): boolean {
  if (tx.receipt) return false;
  if (!tx.lastCheckedBlockNumber) return true;
  const blocksSinceCheck = currentBlock - tx.lastCheckedBlockNumber;
  if (blocksSinceCheck < 1) return false;
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60;
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9;
  }
  if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2;
  }
  // otherwise every block
  return true;
}

export default function Updater(): null {
  const walletName = useSelector((state: RootState) => state.account.wallet);
  const hooks = useWallet(walletName);
  const { useProvider, useChainId } = hooks;
  const chainId = useChainId();
  const library = useProvider();
  const currentBlockNumber = useCurrentBlock();

  const dispatch = useAppDispatch();
  const state = useSelector<AppState, AppState["transactions"]>(
    (s) => s.transactions
  );

  const transactions = useMemo(
    () => (chainId ? state[chainId] ?? {} : {}),
    [chainId, state]
  );

  useEffect(() => {
    if (!chainId || !library || !currentBlockNumber) return;

    Object.keys(transactions)
      .filter((hash) => shouldCheck(currentBlockNumber, transactions[hash]))
      .forEach((hash) => {
        library
          .getTransactionReceipt(hash)
          .then((receipt) => {
            if (receipt) {
              dispatch(
                finalizeTransaction({
                  chainId,
                  hash,
                  receipt: {
                    blockHash: receipt.blockHash,
                    blockNumber: receipt.blockNumber,
                    contractAddress: receipt.contractAddress,
                    from: receipt.from,
                    status: receipt.status,
                    to: receipt.to,
                    transactionHash: receipt.transactionHash,
                    transactionIndex: receipt.transactionIndex,
                  },
                })
              );
              receipt.status === 1
                ? Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Confirmed`,
                    showConfirmButton: false,
                    timer: 1500,
                  })
                : Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                  });
            } else {
              dispatch(checkedTransaction({ chainId, hash }));
            }
          })
          .catch((error) => {
            console.error(`failed to check transaction hash: ${hash}`, error);
          });
      });
  }, [chainId, library, transactions, dispatch, currentBlockNumber]);

  return null;
}