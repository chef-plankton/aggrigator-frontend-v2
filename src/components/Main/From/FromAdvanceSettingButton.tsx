import React from "react";
import settingImage from "../../../assets/img/settings.png";
import ReactTooltip from "react-tooltip";
import { useDispatch } from "react-redux";
import { FromAdvanceSettingStatus } from "../../../features/modals/modalsSlice";

function FromAdvanceSettingButton() {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="hover:bg-slate-200 p-2 rounded-md cursor-pointer"
        onClick={() => dispatch(FromAdvanceSettingStatus(true))}
      >
        <div>
          <img
            // data-tip
            // data-for="settingbutton"
            src={settingImage}
            alt=""
            className="w-[25px]"
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

export default FromAdvanceSettingButton;
