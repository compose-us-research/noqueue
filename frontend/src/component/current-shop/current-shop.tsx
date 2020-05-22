import React from "react";
import { ReactComponent as BookIcon } from "../../asset/image/book-icon.svg";
import Header from "../header/header";
import ListItem from "../list-item/list-item";
import { useShop } from "../../service/server/connection";

interface CurrentShopProps {
  onClick?: () => void;
}

const CurrentShop: React.FC<CurrentShopProps> = ({ onClick }) => {
  const shop = useShop();
  console.log("rendering CurrentShop", { shop });

  return (
    <Header onClick={onClick}>
      <ListItem text={shop.address} icon={<BookIcon />} label={shop.name} />
    </Header>
  );
};

export default CurrentShop;
