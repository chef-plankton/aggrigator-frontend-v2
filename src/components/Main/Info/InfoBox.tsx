import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

function InfoBox() {
  const showRoute = useSelector(({ route }: RootState) => route.showRoute);
  return (
    <>{showRoute ? <div className='p-[20px] bg-[#22223D] w-[100%] mt-[20px] font-outfit font-[500] text-[16px]'>
        <div className="flex justify-between text-white mb-5">
            <span className="text-[#bfbfbf]">Estimated Gas</span>
            <span>$44.21</span>
        </div>
        <div className="flex justify-between text-white my-5">
            <span className="text-[#bfbfbf]">Akka Fee</span>
            <span className="text-[#4FC47E]">Free</span>
        </div>
        <div className="flex justify-between text-white my-5">
            <span className="text-[#bfbfbf]">Price Impact</span>
            <span>0.00%</span>
        </div>
        <div className="flex justify-between text-white mt-5">
            <span className="text-[#bfbfbf]">You Save</span>
            <span className="text-[#4FC47E]">$180</span>
        </div>
    </div> : ""}</>
  );
}

export default InfoBox;
