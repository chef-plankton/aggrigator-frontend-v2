import React from "react";
import settingImage from "../../../assets/img/settingicon.png";
import ReactTooltip from "react-tooltip";
import { useDispatch } from "react-redux";
import { FromAdvanceSettingStatus } from "../../../features/modals/modalsSlice";

function FromAdvanceSettingButton() {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="hover:bg-[#1B1A2E] p-2 rounded-md cursor-pointer"
        onClick={() => dispatch(FromAdvanceSettingStatus(true))}
      >
        <div>
          <img
            // data-tip
            // data-for="settingbutton"
            src={settingImage}
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

export default FromAdvanceSettingButton;
