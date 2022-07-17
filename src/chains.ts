import type { AddEthereumChainParameter } from "@web3-react/types";

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};
const BNB: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Bnb",
  symbol: "BNB",
  decimals: 18,
};
const FTM: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ftm",
  symbol: "FTM",
  decimals: 18,
};

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

export const CHAINS: {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
} = {
  // BSC
  56: {
    urls: ["https://rpc.ankr.com/bsc"].filter((url) => url !== undefined),
    name: "BSC Mainnet",
    nativeCurrency: BNB,
    blockExplorerUrls: ["https://bscscan.com"],
  },
  // Fantom
  250: {
    urls: ["https://rpc.ankr.com/fantom"].filter((url) => url !== undefined),
    name: "Fantom Mainnet",
    nativeCurrency: FTM,
    blockExplorerUrls: ["https://ftmscan.com"],
  },
  // BSC Testnet
  97: {
    urls: ["https://data-seed-prebsc-2-s3.binance.org:8545/"].filter(
      (url) => url !== undefined
    ),
    name: "BSC Testnet",
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  // Fantom Testnet
  4002: {
    urls: ["https://rpc.ankr.com/fantom_testnet"].filter(
      (url) => url !== undefined
    ),
    name: "Fantom Testnet",
    blockExplorerUrls: ["https://testnet.ftmscan.com"],
  },
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});
