/* eslint-disable no-param-reassign */
import { createReducer } from "@reduxjs/toolkit";
import {
  addTransaction,
  checkedTransaction,
  clearAllTransactions,
  finalizeTransaction,
  SerializableTransactionReceipt,
  TransactionType,
} from "./actions";
import { resetUserState } from "../global/actions";

const now = () => new Date().getTime();

export interface TransactionDetails {
  hash: string;
  approval?: { tokenAddress: string; spender: string };
  type?: TransactionType;
  summary?: string;
  claim?: { recipient: string };
  receipt?: SerializableTransactionReceipt;
  lastCheckedBlockNumber?: number;
  addedTime: number;
  confirmedTime?: number;
  from: string;
}

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails;
  };
}

export const initialState: TransactionState = {};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(
      addTransaction,
      (
        transactions,
        { payload: { chainId, from, hash, approval, summary, claim, type } }
      ) => {
        if (transactions[chainId]?.[hash]) {
          throw Error("Attempted to add existing transaction.");
        }
        const txs = transactions[chainId] ?? {};
        txs[hash] = {
          hash,
          approval,
          summary,
          claim,
          from,
          addedTime: now(),
          type,
        };
        transactions[chainId] = txs;
      }
    )
    .addCase(clearAllTransactions, (transactions, { payload: { chainId } }) => {
      if (!transactions[chainId]) return;
      transactions[chainId] = {};
    })
    .addCase(
      checkedTransaction,
      (transactions, { payload: { chainId, hash } }) => {
        const tx = transactions[chainId]?.[hash];
        if (!tx) {
          return;
        }
      }
    )
    .addCase(
      finalizeTransaction,
      (transactions, { payload: { hash, chainId, receipt } }) => {
        const tx = transactions[chainId]?.[hash];
        if (!tx) {
          return;
        }
        tx.receipt = receipt;
        tx.confirmedTime = now();
      }
    )
    .addCase(resetUserState, (transactions, { payload: { chainId } }) => {
      if (transactions[chainId]) {
        transactions[chainId] = {};
      }
    })
);
