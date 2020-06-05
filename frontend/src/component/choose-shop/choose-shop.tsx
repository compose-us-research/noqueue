import React from "react";

import ListScreen from "../list-screen/list-screen";
import { useShops } from "../../service/server/connection";
import idToLink from "../../lib/id-to-link/id-to-link";

interface ChooseShopProps {
  backToIndex: () => void;
  navigateTo: (path: string) => void;
}

const ChooseShop: React.FC<ChooseShopProps> = ({ backToIndex, navigateTo }) => {
  const shops = useShops();
  return (
    <ListScreen
      backToIndex={backToIndex}
      label="Deine gespeicherten Tickets"
      list={shops.map((shop) => {
        return {
          id: shop["@id"],
          label: shop.name,
          text: `${shop.address.streetAddress}, ${shop.address.postalCode} ${shop.address.city}`,
          action: () => {
            window.location.href = idToLink(shop["@id"]);
          },
        };
      })}
    />
  );
};

export default ChooseShop;
