import React, { useContext, useState } from "react";
import useSWR from "swr";
import { ShopId, ShopConfig } from "../domain";
import * as fetcher from "./fetcher";
import * as push from "./push";

export const connection = { fetcher, push };

export type ShopFetcher = (shopId: ShopId) => Promise<ShopConfig>;

export type Connection = typeof connection;

interface FetcherContextProps {
  connection: Connection;
  currentShopId: ShopId;
  setCurrentShopId: (shopId: ShopId) => void;
}

const FetcherContext = React.createContext<FetcherContextProps>({
  connection,
  currentShopId: undefined,
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
  const [currentShopId, setCurrentShopId] = useState<ShopId>();
  return (
    <FetcherContext.Provider
      value={{ connection, currentShopId, setCurrentShopId }}
    >
      {children}
    </FetcherContext.Provider>
  );
};

export const useFetch = (url: string) => {
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
