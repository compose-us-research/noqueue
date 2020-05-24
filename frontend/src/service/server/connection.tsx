import React, { useContext } from "react";
import useSWR from "swr";
import { ShopId, ShopConfig } from "../domain";
import * as fetcher from "./fetcher";
import * as push from "./push";

export const connection = { fetcher, push };

export type ShopFetcher = (shopId: ShopId) => Promise<ShopConfig>;

export type Connection = typeof connection;

const API_URL = (window as any).config?.BASE_URL || "";
console.log("API_URL", API_URL);

interface FetcherContextProps {
  connection: Connection;
  currentShopId: ShopId;
}

const FetcherContext = React.createContext<FetcherContextProps>({
  connection,
  currentShopId: "default",
});

interface FetcherProviderProps {
  children: React.ReactNode;
  connection: typeof connection;
  currentShopId: string;
}

export const FetcherProvider: React.FC<FetcherProviderProps> = ({
  children,
  connection,
  currentShopId = "default",
}) => {
  return (
    <FetcherContext.Provider value={{ connection, currentShopId }}>
      {children}
    </FetcherContext.Provider>
  );
};

const useFetch = (path: string) => {
  const { connection } = useContext(FetcherContext);
  const { data } = useSWR(`${API_URL}${path}`, connection.fetcher.fetcher, {
    suspense: true,
  });
  return data;
};

export const useShop: () => ShopConfig = () => {
  const { currentShopId } = useContext(FetcherContext);
  const data = useFetch(`/shop/${currentShopId}`);
  return data!;
};

function idFn<T>(a: T): T {
  return a;
}

export function useShopFetch<T>(
  path: string,
  mapper: (from: any) => T = idFn
): T {
  const { currentShopId } = useContext(FetcherContext);
  const data = useFetch(`/shop/${currentShopId}${path}`);
  return mapper(data!);
}

export const usePush = () => {
  const { connection } = useContext(FetcherContext);
  return connection.push;
};
