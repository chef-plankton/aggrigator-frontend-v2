import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import ArrowDownFont from "../../../assets/arrow-down-sign-to-navigate.png";
import bridgeIcon from "../../../assets/brooklyn-bridge.png";
import bnblightIcon from "../../../assets/img/chains/binance-light.svg";
import fantomIcon from "../../../assets/img/chains/fantom.svg";
import { NetworkName } from "../../../config/constants/types";
import {
  changeResponseData,
  changeShowRoute,
} from "../../../features/route/routeSlice";
import DexBox from "./DexBox";
// From Box Styles
const MainStyled = styled.div`
  background: #22223d;
  padding: 20px 20px;
  margin-bottom: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const HeaderStyled = styled.div`
  margin-bottom: 40px;
`;
const MenusStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

function Route() {
  const [active, setActive] = useState(1);
  const fromToken = useSelector(({ route }: RootState) => route.fromToken);
  const toToken = useSelector(({ route }: RootState) => route.toToken);
  const fromChain = useSelector(({ route }: RootState) => route.fromChain);
  const toChain = useSelector(({ route }: RootState) => route.toChain);
  const amount = useSelector(({ route }: RootState) => route.amount);
  const showRoute = useSelector(({ route }: RootState) => route.showRoute);
  const responseData = useSelector(
    ({ route }: RootState) => route.responseData
  );

  const [masir, setMasir] = useState([]);
  const dispatch = useDispatch();

  let oprationSeperated = responseData?.routes[0]?.operations_seperated;

  useEffect(() => {
    if (oprationSeperated != undefined) {
      setMasir(oprationSeperated);
    }
  }, []);
  return (
    <>
      {showRoute ? (
        <div className='rounded-[5px] flex flex-col w-[100%] justify-center items-center bg-[#22223D] mt-[20px] p-[20px]'>
          <div className='text-[#4FC37E] w-[100%] font-outfit text-left'>
            Most Optimized Route
          </div>
          <div className='mt-3 w-[100%]'>
            {oprationSeperated[0].chain === NetworkName.BRIDGE.toLowerCase() &&
              oprationSeperated.length == 1 && (
                <div className='text-white mt-3 flex justify-between w-[100%]'>
                  <span className='font-outfit'>Bridge</span>
                  <div>
                    <span className='font-outfit'>Stargate</span>
                  </div>
                </div>
              )}

            {oprationSeperated[0]?.chain === NetworkName.BRIDGE.toLowerCase() &&
              oprationSeperated?.length == 2 && (
                <>
                  <div className='text-white mt-3 flex justify-between w-[100%]'>
                    <span className='font-outfit'>Bridge</span>
                    <div>
                      <span className='font-outfit'>Stargate</span>
                    </div>
                  </div>
                  <div className='text-white mt-3 flex justify-between w-[100%]'>
                    <span className='font-outfit'>Fantom</span>
                    <div>
                      <span className='font-outfit'>{`${oprationSeperated[1]?.operations[0].offer_token[3]} > `}</span>
                      {oprationSeperated[1]?.operations.map((e, index) =>
                        index ===
                        oprationSeperated[1]?.operations.length - 1 ? (
                          <span className='font-outfit'>{`${e.ask_token[3]}`}</span>
                        ) : (
                          <span className='font-outfit'>{`${e.ask_token[3]} > `}</span>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}

            {oprationSeperated[1]?.chain === NetworkName.BRIDGE.toLowerCase() &&
              oprationSeperated?.length == 2 && (
                <>
                  <div className='text-white mt-3 flex justify-between w-[100%]'>
                    <span className='font-outfit'>BNB Chain</span>
                    <div>
                      <span className='font-outfit'>{`${oprationSeperated[0]?.operations[0].offer_token[3]} > `}</span>
                      {oprationSeperated[0]?.operations.map((e, index) =>
                        index ===
                        oprationSeperated[0]?.operations.length - 1 ? (
                          <span className='font-outfit'>{`${e.ask_token[3]}`}</span>
                        ) : (
                          <span className='font-outfit'>{`${e.ask_token[3]} > `}</span>
                        )
                      )}
                    </div>
                  </div>
                  <div className='text-white mt-3 flex justify-between w-[100%]'>
                    <span className='font-outfit'>Bridge</span>
                    <div>
                      <span className='font-outfit'>Stargate</span>
                    </div>
                  </div>
                </>
              )}

            {oprationSeperated[1]?.chain === NetworkName.BRIDGE.toLowerCase() &&
              oprationSeperated?.length == 3 && (
                <>
                  <div className='text-white mt-3 flex justify-between w-[100%]'>
                    <span className='font-outfit'>
                      {oprationSeperated[0]?.chain ===
                      NetworkName.BSC.toLowerCase()
                        ? "BNB Chain"
                        : "Fantom"}
                    </span>
                    <div>
                      <span className='font-outfit'>{`${oprationSeperated[0]?.operations[0].offer_token[3]} > `}</span>
                      {oprationSeperated[0]?.operations.map((e, index) =>
                        index ===
                        oprationSeperated[0]?.operations.length - 1 ? (
                          <span className='font-outfit'>{`${e.ask_token[3]}`}</span>
                        ) : (
                          <span className='font-outfit'>{`${e.ask_token[3]} > `}</span>
                        )
                      )}
                    </div>
                  </div>
                  <div className='text-white mt-3 flex justify-between w-[100%]'>
                    <span className='font-outfit'>Bridge</span>
                    <div>
                      <span className='font-outfit'>Stargate</span>
                    </div>
                  </div>
                  <div className='text-white mt-3 flex justify-between w-[100%]'>
                    <span className='font-outfit'>
                      {oprationSeperated[2]?.chain ===
                      NetworkName.BSC.toLowerCase()
                        ? "BNB Chain"
                        : "Fantom"}
                    </span>
                    <div>
                      <span className='font-outfit'>{`${oprationSeperated[2]?.operations[0].offer_token[3]} > `}</span>
                      {oprationSeperated[2]?.operations.map((e, index) =>
                        index ===
                        oprationSeperated[2]?.operations.length - 1 ? (
                          <span className='font-outfit'>{`${e.ask_token[3]}`}</span>
                        ) : (
                          <span className='font-outfit'>{`${e.ask_token[3]} > `}</span>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}

            {oprationSeperated[0]?.chain === NetworkName.FTM.toLowerCase() &&
              oprationSeperated?.length == 1 && (
                <>
                  <div className='text-white mt-3 flex justify-between w-[100%]'>
                    <span className='font-outfit'>Fantom</span>
                    <div>
                      <span className='font-outfit'>{`${oprationSeperated[0]?.operations[0].offer_token[3]} > `}</span>
                      {oprationSeperated[0]?.operations.map((e, index) =>
                        index ===
                        oprationSeperated[0]?.operations.length - 1 ? (
                          <span className='font-outfit'>{`${e.ask_token[3]}`}</span>
                        ) : (
                          <span className='font-outfit'>{`${e.ask_token[3]} > `}</span>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}
            {oprationSeperated[0]?.chain === NetworkName.BSC.toLowerCase() &&
              oprationSeperated?.length == 1 && (
                <>
                  <div className='text-white mt-3 flex justify-between w-[100%]'>
                    <span className='font-outfit'>BNB Chain</span>
                    <div>
                      <span className='font-outfit'>{`${oprationSeperated[0]?.operations[0].offer_token[3]} > `}</span>
                      {oprationSeperated[0]?.operations.map((e, index) =>
                        index ===
                        oprationSeperated[0]?.operations.length - 1 ? (
                          <span className='font-outfit'>{`${e.ask_token[3]}`}</span>
                        ) : (
                          <span className='font-outfit'>{`${e.ask_token[3]} > `}</span>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Route;
