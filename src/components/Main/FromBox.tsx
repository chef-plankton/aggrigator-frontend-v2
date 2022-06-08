import React from "react";
import styled from "styled-components";
import ChangeChainButton from "./ChangeChainButton";
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
const StyledInput = styled.input`
  position: relative;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 44px;
  padding: 0px;
  display: block;
  color: "palevioletred";
  background: none;
  border: none;
  outline: none;
  border-bottom: 1px solid #757575;
  border-radius: 3px;
  width: 90%;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  appearance: textfield;
  @media (max-width: 768px) {
    width: 100%;
  }
  &:focus {
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 50px;
  }
  :-ms-input-placeholder {
    font-size: 50px;
  }
`;
function FromBox() {
  return (
    <StyledFromBox>
      <div className="px-3 py-1 w-[100%] flex justify-between">
        <div>From</div>
        <div>Balance: -</div>
      </div>
      <div className="px-3 py-5 flex justify-between flex-col md:flex-row">
        <div className="md:w-[50%] w-[100%}">
          <StyledInput placeholder="0.0" />
        </div>
        <div className="md:w-[50%] w-[100%} flex justify-between mt-[50px] md:mt-0">
          <ChangeChainButton
            imageSrc={
              "https://app.1inch.io/assets/images/network-logos/ethereum.svg"
            }
            coinName={"Ethereum"}
            chain={"mainnet"}
          />
          <ChangeChainButton
            imageSrc={
              "https://app.1inch.io/assets/images/network-logos/ethereum.svg"
            }
            coinName={"Ethereum"}
            chain={"mainnet"}
          />
        </div>
      </div>
    </StyledFromBox>
  );
}

export default FromBox;
