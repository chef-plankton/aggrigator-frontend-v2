import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { hooks, metaMask } from "../../connectors/metaMask";
import { CHAINS, getAddChainParameters, URLS } from "../../chains";
import metaMaskIcon from "../../assets/img/wallets/metamask.png";
import { getWETHContract, getContract } from "../../utils/contractHelpers";
import { ethers } from "ethers";
import { parseEther } from "@ethersproject/units";
import { useERC20 } from "../../hooks/useContract";
import { useDispatch } from "react-redux";
import { changeWallet } from "../../features/account/accountSlice";

function MetaMaskCard() {
  const { useIsActivating, useIsActive } = hooks;
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const [error, setError] = useState(undefined);
  // const provider = useProvider();

  // console.log(
  //   getWETHContract("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", provider).deposit({value: parseEther("0.001")})
  // );

  // attempt to connect eagerly on mount
  
  const dispatch = useDispatch();
  return (
    <div
      className="flex items-center justify-between border-[1px] rounded-xl border-[#D3D3D3] px-[12px] py-[15px] bg-[#edeef2] mb-2 cursor-pointer"
      onClick={
        isActive
          ? undefined
          : isActivating
          ? undefined
          : () =>
              metaMask
                .activate(getAddChainParameters(chainId))
                .then(() => {
                  setError(undefined);
                  dispatch(changeWallet("metamask"));
                })
                .catch(setError)
      }
    >
      <h6 className="font-medium text-[16px]">MetaMask</h6>
      <div>
        <img src={metaMaskIcon} alt="" className="w-[32px]" />
      </div>
    </div>
  );
}

export default MetaMaskCard;
