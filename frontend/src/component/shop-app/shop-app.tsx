import React, { useState } from "react";

import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import RegisterShop from "../register-shop/register-shop";
import Spacer from "../spacer/spacer";
import styles from "./shop-app.module.css";
import ReservableTimes from "../reservable-times/reservable-times";
import ShareShop from "../share-shop/share-shop";
import { usePush, useShop } from "../../service/server/connection";
import generateTimeslotsFromTimeranges from "../../lib/generate-timeslots-from-timeranges/generate-timeslots-from-timeranges";

interface ShopAppProps {
  backToIndex: () => void;
}

const ShopApp: React.FC<ShopAppProps> = ({ backToIndex }) => {
  const { push } = useHistory();
  const match = useRouteMatch();
  const shop = useShop();
  const [, setError] = useState<void>();
  const { updateOpeningHours, updateShop } = usePush();

  return (
    <div className={styles.root}>
      <div className={styles.screen}>
        <Switch>
          <Route path={`${match.path}/share`}>
            <ShareShop backToIndex={backToIndex} />
          </Route>
          <Route path={`${match.path}/slots`}>
            <ReservableTimes
              handleSubmit={async ({ ranges }) => {
                try {
                  await updateOpeningHours(
                    shop,
                    generateTimeslotsFromTimeranges(ranges)
                  );
                  push(`${match.path}/share`);
                } catch (e) {
                  setError(() => {
                    throw e;
                  });
                }
              }}
            />
          </Route>
          <Route path="/">
            <RegisterShop
              onRegister={async (values) => {
                try {
                  await updateShop({ ...shop, ...values });
                  push(`${match.path}/slots`);
                } catch (e) {
                  setError(() => {
                    throw e;
                  });
                }
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
