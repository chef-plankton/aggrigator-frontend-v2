import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import FromBalance from "./FromBalance";
import FromChangeChainButton from "./FromChangeChainButton";
import FromChangeNetworkButton from "./FromChangeNetworkButton";
import FromInput from "./FromInput";
const StyledFromBox = styled.div`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
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
`;

function FromBox() {
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  return (
    <StyledFromBox>
      <div className="px-3 py-1 w-[100%] flex justify-between">
        <div>From</div>
        <FromBalance />
      </div>
      <div className="px-3 py-5 flex justify-between flex-col md:flex-row">
        
        <div className="md:w-[50%] w-[100%} flex justify-between ">
          <FromChangeNetworkButton
            imageSrc={`${
              chainId === 1
                ? "https://app.1inch.io/assets/images/network-logos/ethereum.svg"
                : ""
            }${
              chainId === 56
                ? "https://app.1inch.io/assets/images/network-logos/binance-light_2.svg"
                : ""
            }${
              chainId === 137
                ? "https://app.1inch.io/assets/images/network-logos/polygon.svg"
                : ""
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
