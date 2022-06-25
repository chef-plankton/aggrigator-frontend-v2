import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import FromBalance from "./FromBalance";
import FromChangeChainButton from "./FromChangeTokenButton";
import FromChangeNetworkButton from "./FromChangeNetworkButton";
import FromInput from "./FromInput";
import bnblightIcon from "../../../assets/img/chains/binance-light.svg";
import polygonIcon from "../../../assets/img/chains/polygon.svg";
import FromAdvanceSetting from "./FromAdvanceSettingButton";
import FromRefresh from "./FromRefresh";
const StyledFromBox = styled.div<{ color: string; backgroundColor: string }>`
  background: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "rgba(255, 255, 255, 0.25)"};
  box-shadow: 0 8px 32px 0 #23293176;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  min-height: 200px;
  margin-bottom: 50px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ color }) => (color ? color : "black")};
`;

function FromBox() {
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  return (
    <StyledFromBox
      color={themeMode === "light" ? "black" : "white"}
      backgroundColor={
        themeMode === "light"
          ? "rgba(255, 255, 255, 0.25)"
          : "rgba(255, 255, 255, 0.25)"
      }
    >
      <div className="px-3 py-1 w-[100%] flex justify-between">
        <FromBalance />
        <div className="flex">
          <FromRefresh />
          <FromAdvanceSetting />
        </div>
      </div>
      <div className="px-3 py-5 flex justify-between flex-col md:flex-row">
        <div className="md:w-[50%] w-[100%} flex justify-between ">
          <FromChangeNetworkButton
            imageSrc={`${chainId === 56 ? bnblightIcon : ""}${
              chainId === 137 ? polygonIcon : ""
            }`}
            coinName={`${chainId === 1 ? "Ethereum" : ""}
            ${chainId === 56 ? "BNB Chain" : ""}
            ${chainId === 137 ? "Polygon" : ""}`}
            chain={"mainnet"}
          />
          <FromChangeChainButton
            imageSrc={
              "https://app.1inch.io/assets/images/network-logos/ethereum.svg"
            }
            coinName={"Ethereum"}
            chain={"mainnet"}
          />
        </div>
        <div className="md:w-[50%] w-[100%} mt-[30px] md:mt-0 flex justify-center">
          <FromInput />
        </div>
      </div>
    </StyledFromBox>
  );
}

export default FromBox;
