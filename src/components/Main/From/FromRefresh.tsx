import React from "react";
import refreshImage from "../../../assets/img/refresh.png";
import ReactTooltip from "react-tooltip";
function FromRefresh() {
  return (
    <>
      <div className="hover:bg-slate-200 p-2 rounded-md cursor-pointer">
        <div>
          <img
            // data-tip
            // data-for="settingbutton"
            src={refreshImage}
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

export default FromRefresh;
