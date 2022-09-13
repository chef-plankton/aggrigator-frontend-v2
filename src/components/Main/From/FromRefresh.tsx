import React from "react";
import refreshImage from "../../../assets/img/refreshicon.png";
import ReactTooltip from "react-tooltip";
import { useDispatch } from "react-redux";
import { changeCounter } from "../../../features/route/routeSlice";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";

function FromRefresh() {
  const dispatch = useDispatch();
  const counter = useSelector(({ route }: RootState) => route.counter);
  const refresher = () => {
    dispatch(changeCounter(counter + 1));
  };
  return (
    <>
      <div
        onClick={refresher}
        className="hover:bg-[#1B1A2E] p-2 pr-0 rounded-md cursor-pointer"
      >
        <div>
          <img
            // data-tip
            // data-for="settingbutton"
            src={refreshImage}
            alt=""
            className="w-[20px]"
          />
          {/* <ReactTooltip
            id="settingbutton"
            type="info"
            effect="solid"
            place="bottom"
          >
            <span>Select your network</span>
          </ReactTooltip> */}
        </div>
      </div>
    </>
  );
}

export default FromRefresh;
