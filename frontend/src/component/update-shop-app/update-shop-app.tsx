import React, { useState } from "react";

import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import UpdateShop from "../update-shop/update-shop";
import Spacer from "../spacer/spacer";
import ReservableTimes from "../reservable-times/reservable-times";
import ShareShop from "../share-shop/share-shop";
import { usePush, useShop } from "../../service/server/connection";
import generateTimeslotsFromTimeranges from "../../lib/generate-timeslots-from-timeranges/generate-timeslots-from-timeranges";
import styles from "./update-shop-app.module.css";

interface UpdateShopAppProps {
  backToIndex: () => void;
}

const UpdateShopApp: React.FC<UpdateShopAppProps> = ({ backToIndex }) => {
  const { push } = useHistory();
  const { path, url } = useRouteMatch();
  const shop = useShop();
  const [, setError] = useState<void>();
  const { updateOpeningHours, updateShop } = usePush();
  console.log("updating shop", { shop });

  return (
    <div className={styles.root}>
      <div className={styles.screen}>
        <Switch>
          <Route path={`${path}/share`}>
            <ShareShop backToIndex={backToIndex} />
          </Route>
          <Route path={`${path}/slots`}>
            <ReservableTimes
              handleSubmit={async ({ ranges }) => {
                try {
                  await updateOpeningHours(
                    shop,
                    generateTimeslotsFromTimeranges(ranges)
                  );
                  push(`${url}/share`);
                } catch (e) {
                  setError(() => {
                    throw e;
                  });
                }
              }}
            />
          </Route>
          <Route path="/">
            <UpdateShop
              onSave={async (values) => {
                try {
                  await updateShop({ ...shop, ...values });
                  push(`${url}/slots`);
                } catch (e) {
                  setError(() => {
                    throw e;
                  });
                }
              }}
              shop={shop}
            />
          </Route>
        </Switch>
      </div>
      <Spacer />
    </div>
  );
};

export default UpdateShopApp;
