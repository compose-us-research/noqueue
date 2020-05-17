import React, { useState } from "react";

import { Timeslot } from "../../service/domain";
import CurrentShop from "../current-shop/current-shop";
import Spacer from "../spacer/spacer";
import styles from "./customer-app.module.css";
import { useRouteMatch, Switch, Route, useHistory } from "react-router-dom";
import RegisterCustomer from "../register-customer/register-customer";
import AvailableTimeslots from "../available-timeslots/available-timeslots";
import ChooseDuration from "../choose-duration/choose-duration";
import { connection, useShop } from "../../service/server/connection";

interface CustomerAppProps {
  backToIndex: () => void;
}

const CustomerApp: React.FC<CustomerAppProps> = () => {
  const { push } = useHistory();
  const match = useRouteMatch();
  const shop = useShop();
  const [duration, setDuration] = useState<number>(15);
  const [slot, setSlot] = useState<Timeslot>();

  return (
    <div className={styles.root}>
      <Switch>
        <Route path={`${match.path}/`} exact>
          <CurrentShop />
          <Spacer />
          <div className={styles.screen}>
            <ChooseDuration defaultValue={duration} onChange={setDuration} />
            <Spacer />
            <AvailableTimeslots
              duration={duration}
              onSelect={(slot) => {
                setSlot(slot);
                if (shop.needsRegistration) {
                  push(`${match.path}/register`);
                } else {
                  connection.push.registerTicket(shop["@id"], slot);
                }
              }}
            />
          </div>
        </Route>
        <Route path={`${match.path}/register`}>
          <CurrentShop />
          <Spacer />
          <RegisterCustomer
            onRegister={(values) => {
              console.log("registering slot", { slot, values });
              connection.push.registerTicket(shop["@id"], slot!, values);
            }}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default CustomerApp;
