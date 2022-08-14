import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import swapIcon from "../../../assets/img/arrows.png";
import {
  changeAmount,
  changeFromChain,
  changeFromToken,
  changeToChain,
  changeToToken,
} from "../../../features/route/routeSlice";
function SwitchBox() {
  const dispatch = useDispatch();
  const fromToken = useSelector(({ route }: RootState) => route.fromToken);
  const toToken = useSelector(({ route }: RootState) => route.toToken);
  const fromChain = useSelector(({ route }: RootState) => route.fromChain);
  const toChain = useSelector(({ route }: RootState) => route.toChain);
  const amount = useSelector(({ route }: RootState) => route.amount);
  const responseData = useSelector(
    ({ route }: RootState) => route.responseData
  );
  const swapBoxes = () => {
    dispatch(changeFromChain(toChain));
    dispatch(changeToChain(fromChain));
    dispatch(changeFromToken(toToken));
    dispatch(changeToToken(fromToken));
    dispatch(
      changeAmount(
        responseData.data.return_amount
          ? (
              Math.round(responseData.data.return_amount * 100000) / 100000
            ).toString()
          : ""
      )
    );
  };
  return (
    <div
      className="rounded-[50%] bg-slate-100 w-[36px] mt-[14px] mb-[14px] p-2 cursor-pointer"
      onClick={() => swapBoxes()}
    >
      <img src={swapIcon} alt="" />
    </div>
  );
}

export default SwitchBox;
