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
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  width: 100%;
  margin-bottom: 35px;
  padding: 10px;
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
      color={themeMode === "light" ? "white" : "white"}
      backgroundColor={
        themeMode === "light"
          ? "transparent"
          : "transparent"
      }
    >
      <div className='py-1 w-[100%] flex justify-between'>
        <div>To</div>
        {/* <ToBalance /> */}
      </div>
      <div className='py-2 flex justify-between flex-col md:flex-row'>
        <div className='md:w-[60%] w-[100%] flex justify-between'>
          <ToChangeNetworkButton
            imageSrc={`${chainId === 56 ? bnblightIcon : ""}${
              chainId === 250 ? fantomIcon : ""
            }${chainId === 97 ? bnblightIcon : ""}`}
            coinName={`${chainId === 56 ? "BNB Chain" : ""}
            ${chainId === 250 ? "Fantom" : ""}${
              chainId === 97 ? "BNB Chain" : ""
            }`}
          />
          <ToChangeChainButton
            imageSrc={
              "https://app.1inch.io/assets/images/network-logos/ethereum.svg"
            }
            coinName={"Ethereum"}
            chain={"mainnet"}
          />
        </div>
        <div className='md:w-[40%] w-[100%} mt-[50px] md:mt-0 flex justify-center'>
          <ToInput />
        </div>
      </div>
    </StyledToBox>
  );
}

export default ToBox;
