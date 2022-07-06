import { ChainId, Token } from "@pancakeswap/sdk";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { AppState } from "../../index";
import { deserializeToken } from "./helpers";

const selectUserTokens = ({ user: { tokens } }: AppState) => tokens;

export const userAddedTokenSelector = createSelector(
  selectUserTokens,
  (serializedTokensMap) =>
    Object.values(serializedTokensMap?.["97" as unknown as ChainId] ?? {}).map(
      deserializeToken
    )
);
export default function useUserAddedTokens(): Token[] {
  return useSelector(userAddedTokenSelector);
}
