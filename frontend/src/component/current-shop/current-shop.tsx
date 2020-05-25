import React from "react";
import { ReactComponent as BookIcon } from "../../asset/image/book-icon.svg";
import Header from "../header/header";
import ListItem from "../list-item/list-item";
import { useShop } from "../../service/server/connection";
import { Address } from "../../service/domain";

interface CurrentShopProps {
  onClick?: () => void;
}

const CurrentShop: React.FC<CurrentShopProps> = ({ onClick }) => {
  const shop = useShop();
  const address: string = addressToText(shop.address);

  return (
    <Header onClick={onClick}>
      <ListItem text={address} icon={<BookIcon />} label={shop.name} />
    </Header>
  );
};

function addressToText(address: Address): string {
  const { city, postalCode, streetAddress } = address;
  return `${streetAddress}, ${postalCode} ${city}`;
}

export default CurrentShop;
