import React from "react";
import styled from "styled-components";
import ToBalance from "./ToBalance";
import ToChangeChainButton from "./ToChangeTokenButton";
import ToChangeNetworkButton from "./ToChangeNetworkButton";
import ToInput from "./ToInput";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import bnblightIcon from "../../../assets/img/chains/binance-light.svg";
import fantomIcon from "../../../assets/img/chains/fantom.svg";
const StyledToBox = styled.div<{ color: string; backgroundColor: string }>`
  background: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "rgba(255, 255, 255, 0.25)"};
  box-shadow: 0 8px 32px 0 #23293176;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  min-height: 200px;
  margin-bottom: 35px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ color }) => (color ? color : "black")};
`;
function ToBox() {
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  const chainId = useSelector(({ route }: RootState) => route.toChain);
  return (
    <StyledToBox
      color={themeMode === "light" ? "black" : "white"}
      backgroundColor={
        themeMode === "light"
          ? "rgba(255, 255, 255, 0.25)"
          : "rgba(255, 255, 255, 0.25)"
      }
    >
      <div className='px-3 py-1 w-[100%] flex justify-between'>
        <div>To</div>
        <ToBalance />
      </div>
      <div className='px-3 py-5 flex justify-between flex-col md:flex-row'>
        <div className='md:w-[50%] w-[100%} flex justify-between'>
          <ToChangeNetworkButton
            imageSrc={`${chainId === 56 ? bnblightIcon : ""}${
              chainId === 250 ? fantomIcon : ""
            }${chainId === 97 ? bnblightIcon : ""}`}
            coinName={`${chainId === 56 ? "BNB Chain" : ""}
            ${chainId === 250 ? "Fantom" : ""}${
              chainId === 97 ? "BNB Chain" : ""
            }`}
            chain={chainId === 97 ? "testnet" : "mainnet"}
          />
          <ToChangeChainButton
            imageSrc={
              "https://app.1inch.io/assets/images/network-logos/ethereum.svg"
            }
            coinName={"Ethereum"}
            chain={"mainnet"}
          />
        </div>
        <div className='md:w-[50%] w-[100%} mt-[50px] md:mt-0 flex justify-center'>
          <ToInput />
        </div>
      </div>
    </StyledToBox>
  );
}

export default ToBox;
