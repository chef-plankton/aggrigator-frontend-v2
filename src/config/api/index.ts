import axios, { AxiosResponse } from "axios";
import { NetworkName } from "../constants/types";
import { HttpMethod, RequestPath, TokenListApi } from "./types";
const instance = axios.create({
  baseURL: "https://www.api.akka.finance",
});
const api = <R>(
  method: HttpMethod,
  path: RequestPath,
  config?: any
): Promise<AxiosResponse<R, any>> => {
  switch (method) {
    case "GET":
      return instance.get(path, config);
    case "POST":
      instance.post(path).then((res) => res);
      break;
  }
};

const getTokenlist = async (chain: NetworkName, limit: number = 1000) =>
  await api<TokenListApi[]>(
    "GET",
    `/tokens?chain=${chain.toLocaleLowerCase()}&limit=${limit}`
  );
const getPriceOfToken = async (symbol: string, fiat: string = "USD") =>
  await api(
    "GET",
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}&convert=${fiat}`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": "e8463497-8b56-49ba-80f3-91c455569f15",
      },
    }
  );

export { getTokenlist, getPriceOfToken };
