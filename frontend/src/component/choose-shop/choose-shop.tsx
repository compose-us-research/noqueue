import React from "react";

import ListScreen from "../list-screen/list-screen";
import { useShops } from "../../service/server/connection";

interface ChooseShopProps {
  backToIndex: () => void;
  navigateTo: (path: string) => void;
}

const ChooseShop: React.FC<ChooseShopProps> = ({ backToIndex, navigateTo }) => {
  const shops = useShops();
  return (
    <ListScreen
      backToIndex={backToIndex}
      label="Was hast Du vor?"
      list={shops.map((shop) => {
        return {
          id: shop["@id"],
          label: shop.name,
          text: `${shop.address.streetAddress}, ${shop.address.postalCode} ${shop.address.city}`,
          action: () => {
            window.location.href = shop["@id"];
          },
        };
      })}
    />
  );
};

export default ChooseShop;
