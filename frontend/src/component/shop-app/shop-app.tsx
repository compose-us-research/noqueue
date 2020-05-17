import React from "react";

import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import RegisterShop from "../register-shop/register-shop";
import Spacer from "../spacer/spacer";
import styles from "./shop-app.module.css";
import ReservableTimes from "../reservable-times/reservable-times";
import ShareShop from "../share-shop/share-shop";
import { updateShop, updateOpeningHours } from "../../service/server/push";
import { useShop } from "../../service/server/connection";

interface ShopAppProps {
  backToIndex: () => void;
}

const ShopApp: React.FC<ShopAppProps> = () => {
  const { push } = useHistory();
  const match = useRouteMatch();
  const shop = useShop();
  console.log({ shop });

  return (
    <div className={styles.root}>
      <div className={styles.screen}>
        <Switch>
          <Route path={`${match.path}/share`}>
            <ShareShop />
          </Route>
          <Route path={`${match.path}/slots`}>
            <ReservableTimes
              handleSubmit={async ({ ranges }) => {
                console.log("submitting...", { ranges });
                await updateOpeningHours(shop["@id"], ranges);
                console.log("pushing...");
                push(`${match.path}/share`);
              }}
            />
          </Route>
          <Route path="/">
            <RegisterShop
              onRegister={async (values) => {
                await updateShop({ ...shop, ...values });
                push(`${match.path}/slots`);
              }}
            />
          </Route>
        </Switch>
      </div>
      <Spacer />
    </div>
  );
};

export default ShopApp;
