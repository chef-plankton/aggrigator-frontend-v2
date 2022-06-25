import React, { FC } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { RootState } from "../../app/store";
import bnblightIcon from "../../assets/img/chains/binance-light.svg";
import polygonIcon from "../../assets/img/chains/polygon.svg";
const ChainsButton: FC<{
  ArrowDownFont: string;
  setDropdown: (value: boolean) => void;
  dropdown: boolean;
  setToggle: (value: boolean) => void;
}> = ({ ArrowDownFont, setDropdown, dropdown, setToggle }) => {
  const toggleChains = () => {
    setDropdown(!dropdown);
    setToggle(true);
  };
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  return (
    <>
      <button
        data-tip
        data-for="chainsbutton"
        onClick={toggleChains}
        className={`py-2 px-3 font-medium ${
          themeMode === "light" ? "text-gray-500" : "text-white"
        }  rounded transition duration-300 flex items-center chainslistbtn`}
      >
        <img
          src={`${chainId === 56 ? bnblightIcon : ""}${
            chainId === 137 ? polygonIcon : ""
          }`}
          alt=""
          className="w-[32px] h-[32px] mr-2"
        />
        {chainId === 56 ? "BNB Chain" : ""}
        {chainId === 137 ? "Polygon" : ""}
        <img
          src={ArrowDownFont}
          alt=""
          className="w-[12px] h-[12px] ml-2 -mb-0.5"
        />
      </button>
      <ReactTooltip id="chainsbutton" type="info" effect="solid" place="bottom">
        <span>Select your network</span>
      </ReactTooltip>
    </>
  );
};

export default ChainsButton;
