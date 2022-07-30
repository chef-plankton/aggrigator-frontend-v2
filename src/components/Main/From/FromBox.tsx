import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import FromBalance from "./FromBalance";
import FromChangeTokenButton from "./FromChangeTokenButton";
import FromChangeNetworkButton from "./FromChangeNetworkButton";
import FromInput from "./FromInput";
import bnblightIcon from "../../../assets/img/chains/binance-light.svg";
import polygonIcon from "../../../assets/img/chains/polygon.svg";
import fantomIcon from "../../../assets/img/chains/fantom.svg";
import FromAdvanceSetting from "./FromAdvanceSettingButton";
import FromRefresh from "./FromRefresh";
import FromToken from "./FromToken";
import useTokenBalance from "../../../hooks/useTokenBalance";
import { formatEther, parseUnits } from "@ethersproject/units";

// From Box Styles
const StyledFromBox = styled.div<{ color: string; backgroundColor: string }>`
  background: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "rgba(255, 255, 255, 0.25)"};
  box-shadow: 0 8px 32px 0 #23293176;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  margin-bottom: 40px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ color }) => (color ? color : "black")};
`;

// From Box Component
function FromBox() {
  // Get data from redux
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  const fromToken = useSelector(({ route }: RootState) => route.fromToken);
  const address = useSelector(({ account }: RootState) => account.address);
  const balance = useTokenBalance(fromToken.adress, address)
  
  
  return (
    <StyledFromBox
      color={themeMode === "light" ? "black" : "white"}
      backgroundColor={
        themeMode === "light"
          ? "rgba(255, 255, 255, 0.25)"
          : "rgba(255, 255, 255, 0.25)"
      }
    >
      {/* box top bar */}
      <div className="px-3 py-1 w-[100%] flex justify-between">

        From: {balance ? formatEther(balance)?.toString() : 0}
        <div className="flex">
          <FromRefresh />
          <FromAdvanceSetting />
        </div>
      </div>
      {/* box datas */}
      <div className="px-3 py-2 flex justify-between flex-col md:flex-row">
        <div className="md:w-[60%] w-[100%} flex justify-between ">
          {/* from network */}
          <FromChangeNetworkButton
            imageSrc={`${chainId === 56 ? bnblightIcon : ""}${chainId === 250 ? fantomIcon : ""
              }${chainId === 97 ? bnblightIcon : ""}`}
            coinName={`
            ${chainId === 56 ? "BNB Chain" : ""}
            ${chainId === 250 ? "Fantom" : ""}${chainId === 97 ? "BNB Chain" : ""
              }`}
          />
          {/* from token */}
          <FromChangeTokenButton
            imageSrc={
              "https://app.1inch.io/assets/images/network-logos/ethereum.svg"
            }
            coinName={"Ethereum"}
            chain={"mainnet"}
          />
        </div>
        {/* from input */}
        <div className="md:w-[40%] w-[100%} mt-[30px] md:mt-0 flex justify-center">
          <FromInput />
        </div>
      </div>
    </StyledFromBox>
  );
}

export default FromBox;
