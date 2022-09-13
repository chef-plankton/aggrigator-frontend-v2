import { isMobile } from "react-device-detect";

function DexBox({ element }) {
  return (
    <div
      className={`z-10 bg-[#f7f7f7] rounded-[6px] flex-1 overflow-hidden ${
        isMobile ? "py-[5px] px-[5px]" : "py-[12px] px-[15px]"
      }`}
    >
      <div className="items-center flex justify-start">
        <div className="w-[24px] h-[24px] md:mr-2">
          <img
            className="w-[100%] h-[100%] rounded-[50%]"
            alt=""
            src={`https://assets-cdn.trustwallet.com/blockchains/${
              element.ask_token[1] === "bsc"
                ? "smartchain"
                : element.ask_token[1] === "fantom"
                ? "fantom"
                : ""
            }/assets/${element.ask_token[0]}/logo.png`}
          />
        </div>
        {isMobile ? (
          ""
        ) : (
          <div
            className={`ellipsis index-module__token-name ${
              isMobile ? "text-[100%]" : "text-[14px]"
            }`}
          >
            {element.ask_token[3]}
          </div>
        )}
      </div>
      {/* <div className='bg-white rounded-[6px] text-[#545454] py-[2px] px-[8px] justify-between items-center flex'>
        <span className='font-12 index-module__dex-name index-module__like-link index-module__enable'>
          {element.exchange}
        </span>
        <span className='font-12 index-module__like-link'>100%</span>
      </div> */}
    </div>
  );
}

export default DexBox;
