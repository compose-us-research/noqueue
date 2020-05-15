import React from "react";
import { ReactComponent as BookIcon } from "../../asset/image/book-icon.svg";
import Header from "../header/header";
import StoreItem from "../store-item/store-item";
import useShop from "../../service/use-shop";

interface CurrentShopProps {}

const CurrentShop: React.FC<CurrentShopProps> = () => {
  const shop = useShop();

  return (
    <Header>
      <StoreItem address={shop.address} icon={<BookIcon />} name={shop.name} />
    </Header>
  );
};

export default CurrentShop;
