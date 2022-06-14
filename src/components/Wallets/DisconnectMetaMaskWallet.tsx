import { hooks, metaMask } from "../../connectors/metaMask";
import forbiddenImg from "./../../assets/img/kindpng_94001.png"
function DisconnectMetaMaskWallet() {
  return (
    <div
      className="flex items-center justify-between border-[1px] rounded-xl border-[#D3D3D3] px-[12px] py-[15px] bg-[#edeef2] mb-2 cursor-pointer"
      onClick={() => {
        console.log(metaMask?.deactivate);
        
        if (metaMask?.deactivate) {
          void metaMask.deactivate();
        } else {
          void metaMask.resetState();
        }
      }}
    >
      <h6 className="font-semibold text-[16px]">Disconnect</h6>
      <div>
        <img
          src={forbiddenImg}
          alt=""
          className="w-[32px]"
        />
      </div>
    </div>
  );
}

export default DisconnectMetaMaskWallet;
