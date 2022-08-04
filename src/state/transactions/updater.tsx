import { parseEther, parseUnits } from "@ethersproject/units";
import { BigNumber } from "ethers";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { RootState } from "../../app/store";
import { useCurrentBlock } from "../../components/Main/Main";
import useWallet from "../../components/Wallets/useWallet";
import {
  ApprovalState,
  changeApprovalState,
  changeApprovevalue,
} from "../../features/account/accountSlice";
import { clearRouteAfterSwap } from "../../features/route/routeSlice";
import { changeSwapButtonState } from "../../features/swapbutton/swapbuttonSlice";
import useTokenBalance from "../../hooks/useTokenBalance";
import { AppState, useAppDispatch } from "../index";
import { checkedTransaction, finalizeTransaction } from "./actions";

enum SwapButonStates {
  CONNECT_TO_WALLET = "CONNECT_TO_WALLET",
  ENTER_AMOUNT = "ENTER_AMOUNT",
  APPROVE = "APPROVE",
  LOADING = "LOADING",
  SWAP = "SWAP",
  WRAP = "WRAP",
  INSUFFICIENT_BALANCE = "INSUFFICIENT_BALANCE",
}

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
  const wallet = useSelector(({ account }: RootState) => account.wallet);
  const hooks = useWallet(wallet);
  const { useProvider, useChainId } = hooks;
  const chainId = useChainId();
  const library = useProvider();
  const currentBlockNumber = useCurrentBlock();
  const approveState = useSelector(
    ({ account }: RootState) => account.approveState
  );
  const dispatch = useAppDispatch();
  const state = useSelector<AppState, AppState["transactions"]>(
    (s) => s.transactions
  );
  const fromToken = useSelector(({ route }: RootState) => route.fromToken);
  const toToken = useSelector(({ route }: RootState) => route.toToken);
  const fromChain = useSelector(({ route }: RootState) => route.fromChain);
  const toChain = useSelector(({ route }: RootState) => route.toChain);
  const amount = useSelector(({ route }: RootState) => route.amount);
  const { useAccount, useIsActivating, useIsActive, useENSNames } =
    useWallet(wallet);
  const approvevalue = useSelector(
    ({ account }: RootState) => account.approvevalue
  );
  const isActive = useIsActive();
  const account = useAccount();
  const transactions = useMemo(
    () => (chainId ? state[chainId] ?? {} : {}),
    [chainId, state]
  );
  const balance = useTokenBalance(fromToken.adress, account);
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
              const tx = transactions[hash];
              if (tx) {
                switch (tx.type) {
                  case "approve":
                    if (receipt.status === 1)
                      dispatch(changeApprovalState(ApprovalState.APPROVED));
                    break;
                  case "swap":
                    if (isActive) {
                      if (receipt.status === 1) {
                        dispatch(changeApprovevalue(null));
                        dispatch(clearRouteAfterSwap());
                      }

                    } else {
                      dispatch(
                        changeSwapButtonState({
                          isDisable: false,
                          state: SwapButonStates.CONNECT_TO_WALLET,
                          text: "Connect To Wallet",
                        })
                      );
                    }
                    break;
                }
              }

              receipt.status === 1
                ? Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `Transaction Confirmed`,
                  html: `<p>Tx: ${tx.hash}</p>`,
                  width: "500px",
                  heightAuto: false,
                  showCancelButton: true,
                  showCloseButton: true,
                  showConfirmButton: true,
                  confirmButtonColor: "black",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Show on BSC Scan",

                }).then((data) => {
                  const { isDismissed, isConfirmed, isDenied } = data
                  if (isConfirmed) {
                    window.open(
                      `${"https://bscscan.com"}/tx/${tx.hash}`,
                      "_blank"
                    );
                  }
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
