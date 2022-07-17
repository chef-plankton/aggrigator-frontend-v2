import { MaxUint256 } from "@ethersproject/constants";
import { TransactionResponse } from "@ethersproject/providers";
import { useCallback, useMemo } from "react";
import useTokenAllowance from "./useTokenAllowance";
import {
  useTransactionAdder,
  useHasPendingApproval,
} from "../state/transactions/hooks";
import { useTokenContract } from "./useContract";
import { useCallWithoutGasPrice } from "./useCallWithoutGasPrice";
import { BigNumber, ethers } from "ethers";

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  tokenAddress?: string,
  amountToApprove?: BigNumber,
  spender?: string
): [ApprovalState, () => Promise<void>] {
  const account = "0x0F6702D890d250b236DDDd4C55A035431Eb8a899";
  const { callWithoutGasPrice } = useCallWithoutGasPrice();

  const token = amountToApprove;
  const currentAllowance = useTokenAllowance(
    tokenAddress,
    account ?? undefined,
    spender
  );
  const pendingApproval = useHasPendingApproval(tokenAddress, spender);

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN;
    // if (amountToApprove.currency === ETHER) return ApprovalState.APPROVED;
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN;

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lt(amountToApprove)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [amountToApprove, currentAllowance, pendingApproval, spender]);

  const tokenContract = useTokenContract(tokenAddress);
  const addTransaction = useTransactionAdder();

  const approve = useCallback(async (): Promise<void> => {
    console.log(approvalState);
    
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.log("Error", "Approve was called unnecessarily");
      console.error("approve was called unnecessarily");
      return;
    }
    if (!token) {
      console.log("Error", "No token");
      console.error("no token");
      return;
    }

    if (!tokenContract) {
      console.log("Error", "Cannot find contract of the token %tokenAddress%", {
        tokenAddress: tokenAddress,
      });
      console.error("tokenContract is null");
      return;
    }

    if (!amountToApprove) {
      console.log("Error", "Missing amount to approve");
      console.error("missing amount to approve");
      return;
    }

    if (!spender) {
      console.log("Error", "No spender");
      console.error("no spender");
      return;
    }

    let useExact = false;

    // eslint-disable-next-line consistent-return
    return callWithoutGasPrice(
      tokenContract,
      "approve",
      [spender, useExact ? amountToApprove : MaxUint256],
      {
        gasLimit: 21000000,
      }
    )
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Approve ${amountToApprove}`,
          approval: { tokenAddress: tokenAddress, spender },
          type: "approve",
        });
      })
      .catch((error: any) => {
        console.error("Failed to approve token", error);
        if (error?.code !== 4001) {
          console.log("Error", error.message);
        }
        throw error;
      });
  }, [
    approvalState,
    token,
    tokenContract,
    amountToApprove,
    spender,
    addTransaction,
    callWithoutGasPrice,
  ]);

  return [approvalState, approve];
}

// wraps useApproveCallback in the context of a swap
export function useApproveCallbackFromTrade(
  tokenAddress?: string,
  inputAmount?: string,
  allowedSlippage = 0
) {
  const amountToApprove = useMemo(
    () => (inputAmount ? ethers.utils.parseUnits(inputAmount) : undefined),
    [inputAmount, allowedSlippage]
  );
  // 0xae13d989dac2f0debff460ac112a837c89baa7cd
  return useApproveCallback(
    tokenAddress,
    amountToApprove,
    "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7"
  );
}
