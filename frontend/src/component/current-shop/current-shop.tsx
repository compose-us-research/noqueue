import React from "react";
import Header from "../header/header";
import StoreItem from "../store-item/store-item";
import useShop from "../../service/use-shop";

interface CurrentShopProps {}

const CurrentShop: React.FC<CurrentShopProps> = () => {
  const shop = useShop();

  return (
    <Header>
      <StoreItem address={shop.address} icon={shop.icon} name={shop.name} />
    </Header>
  );
};

export default CurrentShop;
