import { ChainId, NetworkInfo, NetworkName } from "./types";

export const networkInfo: NetworkInfo[] = [
    { name: NetworkName.BSC, chainId: ChainId.BSC },
    { name: NetworkName.FTM, chainId: ChainId.FTM },
]

export const defaultDecimalPlaces: number = 6 