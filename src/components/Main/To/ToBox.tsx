import React from "react";
import styled from "styled-components";
import ToBalance from "./ToBalance";
import ToChangeChainButton from "./ToChangeChainButton";
import ToChangeNetworkButton from "./ToChangeNetworkButton";
import ToInput from "./ToInput";
const StyledToBox = styled.div`
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
function ToBox() {
  return (
    <StyledToBox>
      <div className="px-3 py-1 w-[100%] flex justify-between">
        <div>To</div>
        <ToBalance />
      </div>
      <div className="px-3 py-5 flex justify-between flex-col md:flex-row">
        <div className="md:w-[50%] w-[100%} flex justify-between">
          <ToChangeNetworkButton
            imageSrc={
              "https://app.1inch.io/assets/images/network-logos/ethereum.svg"
            }
            coinName={"Ethereum"}
            chain={"mainnet"}
          />
          <ToChangeChainButton
            imageSrc={
              "https://app.1inch.io/assets/images/network-logos/ethereum.svg"
            }
            coinName={"Ethereum"}
            chain={"mainnet"}
          />
        </div>
        <div className="md:w-[50%] w-[100%} mt-[50px] md:mt-0 flex justify-center">
          <ToInput />
        </div>
      </div>
    </StyledToBox>
  );
}

export default ToBox;
