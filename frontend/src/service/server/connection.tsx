import React, { useContext, useState } from "react";
import useSWR from "swr";
import { ShopId, ShopConfig } from "../domain";
import * as fetcher from "./fetcher";
import * as push from "./push";

export const connection = { fetcher, push };

export type ShopFetcher = (shopId: ShopId) => Promise<ShopConfig>;

export type Connection = typeof connection;

const BASE_URL = (window as any).config?.BASE_URL || "";
console.log({ BASE_URL });

interface FetcherContextProps {
  connection: Connection;
  currentShopId: ShopId;
  setCurrentShopId: (shopId: ShopId) => void;
}

const FetcherContext = React.createContext<FetcherContextProps>({
  connection,
  currentShopId: "default",
  setCurrentShopId: () => {
    throw Error("fetcher context not initialized");
  },
});

interface FetcherProviderProps {
  children: React.ReactNode;
  connection: typeof connection;
}

export const FetcherProvider: React.FC<FetcherProviderProps> = ({
  children,
  connection,
}) => {
  const [currentShopId, setCurrentShopId] = useState<ShopId>("default");
  return (
    <FetcherContext.Provider
      value={{ connection, currentShopId, setCurrentShopId }}
    >
      {children}
    </FetcherContext.Provider>
  );
};

const useFetch = (path: string) => {
  const url = `${BASE_URL}${path}`;
  console.log("fetching", { url });
  const { connection } = useContext(FetcherContext);
  const { data } = useSWR(url, connection.fetcher.fetcher, {
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
