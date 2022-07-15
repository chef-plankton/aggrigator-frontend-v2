import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../index";
import { checkedTransaction, finalizeTransaction } from "./actions";
import useWallet from "../../components/Wallets/useWallet";
import Swal from "sweetalert2";

export default function Updater(): null {
  const hooks = useWallet("metamask");
  const { useProvider, useChainId } = hooks;
  const chainId = useChainId();
  const library = useProvider();

  const dispatch = useAppDispatch();
  const state = useSelector<AppState, AppState["transactions"]>(
    (s) => s.transactions
  );

  const transactions = useMemo(
    () => (chainId ? state[chainId] ?? {} : {}),
    [chainId, state]
  );

  useEffect(() => {
    if (!chainId || !library) return;

    Object.keys(transactions).forEach((hash) => {
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
  }, [chainId, library, transactions, dispatch]);

  return null;
}
