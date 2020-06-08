import React from "react";
import Header from "../header/header";
import ListItem from "../list-item/list-item";
import { useShop } from "../../service/server/connection";
import { Address } from "../../service/domain";
import StoreIcon from "../store-icon/store-icon";

interface CurrentShopProps {
  onClick?: () => void;
}

const CurrentShop: React.FC<CurrentShopProps> = ({ onClick }) => {
  const shop = useShop();
  const address: string = addressToText(shop.address);

  return (
    <Header onClick={onClick}>
      <ListItem
        text={address}
        icon={<StoreIcon name={shop.name} />}
        label={shop.name}
      />
    </Header>
  );
};

function addressToText(address: Address): string {
  const { city, postalCode, streetAddress } = address;
  return `${streetAddress}, ${postalCode} ${city}`;
}

export default CurrentShop;
