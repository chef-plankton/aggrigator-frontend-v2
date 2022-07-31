import { FC, MouseEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { hooks, metaMask } from "../../connectors/metaMask";
import metaMaskIcon from "../../assets/img/wallets/metamask.png";
import { useDispatch } from "react-redux";


const MetaMaskCard: FC<{
  handleClick: (e: MouseEvent<HTMLElement>) => void;
}> = ({ handleClick }) => {
  const { useIsActivating, useIsActive } = hooks;
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const [error, setError] = useState(undefined);

  return (
    <div
      className="flex items-center justify-between border-[1px] rounded-xl border-[#D3D3D3] px-[12px] py-[15px] bg-[#edeef2] mb-2 cursor-pointer"
      onClick={handleClick}
    >
      <h6 className="font-medium text-[16px]">MetaMask</h6>
      <div>
        <img src={metaMaskIcon} alt="" className="w-[32px]" />
      </div>
    </div>
  );
};

export default MetaMaskCard;
