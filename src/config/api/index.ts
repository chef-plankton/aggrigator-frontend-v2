import axios, { AxiosResponse } from "axios";
import { HttpMethod, RequestPath, TokenListApi } from "./types";
const instance = axios.create({
  baseURL: "http://192.64.112.22:8084",
});
const api = <R>(
  method: HttpMethod,
  path: RequestPath
): Promise<AxiosResponse<R, any>> => {
  switch (method) {
    case "GET":
      return instance.get(path);
    case "POST":
      instance.post(path).then((res) => res);
      break;
  }
};

const getTokenlist = async (chain: string, limit: number = 1000) =>
  await api<TokenListApi[]>("GET", `/tokens?chain=${chain}&limit=${limit}`);

export { getTokenlist };
