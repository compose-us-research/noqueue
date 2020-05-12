import React, { useState, useEffect, useCallback } from "react";

import { ReactComponent as BookIcon } from "../../asset/image/book-icon.svg";
import { RegisteredShop, Shop } from "../../service/domain";
import RegisterShop from "../register-shop/register-shop";
import Spacer from "../spacer/spacer";
import styles from "./shop-app.module.css";
import ReservableTimes from "../reservable-times/reservable-times";
import ShareShop from "../share-shop/share-shop";

interface ShopAppProps {
  backToIndex: () => void;
}

const ShopApp: React.FC<ShopAppProps> = () => {
  const [currentScreen, setCurrentScreen] = useState<JSX.Element>();
  const [selectedShop, setSelectedShop] = useState<RegisteredShop>();
  const registerShop: (shop: Shop) => Promise<RegisteredShop> = useCallback(
    async (shop) => {
      return {
        ...shop,
        icon: <BookIcon />,
        ranges: [],
        "@id": "54235",
      };
    },
    []
  );

  useEffect(() => {
    if (selectedShop) {
      setCurrentScreen(
        <ReservableTimes
          handleSubmit={async (ranges) => {
            console.log("submitting...", { ranges });
            setCurrentScreen(<ShareShop />);
          }}
          ranges={selectedShop.ranges}
        />
      );
    } else {
      setCurrentScreen(
        <RegisterShop
          onRegister={async (shop) => {
            console.log("registered shop", shop);
            const registeredShop = await registerShop(shop);
            setSelectedShop(registeredShop);
          }}
        />
      );
    }
  }, [registerShop, selectedShop, setCurrentScreen]);

  return (
    <div className={styles.root}>
      <div className={styles.screen}>{currentScreen}</div>
      <Spacer />
    </div>
  );
};

export default ShopApp;
