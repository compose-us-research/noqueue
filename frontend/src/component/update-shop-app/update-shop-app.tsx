import React, { useState } from "react";

import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import UpdateShop from "../update-shop/update-shop";
import Spacer from "../spacer/spacer";
import ReservableTimes from "../reservable-times/reservable-times";
import ShareShop from "../share-shop/share-shop";
import { usePush, useShop } from "../../service/server/connection";
import generateTimeslotsFromTimeranges from "../../lib/generate-timeslots-from-timeranges/generate-timeslots-from-timeranges";
import styles from "./update-shop-app.module.css";
import ReservableDays from "../reservable-days/reservable-days";
import { updateOpeningDays } from "../../service/server/push";
import Stub from "../stub/stub";
import { Dayslot } from "../../service/domain";

interface UpdateShopAppProps {
  backToIndex: () => void;
}

const UpdateShopApp: React.FC<UpdateShopAppProps> = ({ backToIndex }) => {
  const { push } = useHistory();
  const { path, url } = useRouteMatch();
  const shop = useShop();
  const [, setError] = useState<void>();
  const { updateOpeningHours, updateShop } = usePush();

  return (
    <div className={styles.root}>
      <div className={styles.screen}>
        <Switch>
          <Route path={`${path}/share`}>
            <ShareShop backToIndex={backToIndex} />
          </Route>
          <Route path={`${path}/slots`}>
            {shop.slotType === "days" ? (
              <ReservableDays
                handleSubmit={async ({ ranges }) => {
                  const toSubmit: Dayslot[] = ranges.map((range) => ({
                    start: range.duration.start,
                    end: range.duration.end,
                    minDuration: range.days.minDuration,
                    maxDuration: range.days.maxDuration,
                    customers: range.customers,
                  }));
                  try {
                    await updateOpeningDays(shop, toSubmit);
                    push(`${url}/share`);
                  } catch (e) {
                    setError(() => {
                      throw e;
                    });
                  }
                }}
              />
            ) : shop.slotType === "holidays" ? (
              <Stub next={() => push(`${url}`)}>Just holidays</Stub>
            ) : (
              <ReservableTimes
                handleSubmit={async ({ holidays, ranges }) => {
                  const toSubmit: Dayslot[] = holidays.map((item) => ({
                    start: item.range.start,
                    end: item.range.end,
                    minDuration: 0,
                    maxDuration: 0,
                    customers: 0,
                  }));
                  try {
                    await updateOpeningHours(
                      shop,
                      generateTimeslotsFromTimeranges(ranges)
                    );
                    await updateOpeningDays(shop, toSubmit);
                    push(`${url}/share`);
                  } catch (e) {
                    setError(() => {
                      throw e;
                    });
                  }
                }}
              />
            )}
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
