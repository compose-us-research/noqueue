import React, { useState } from "react";

import { Ticket, RegisteredTicket } from "../../service/domain";
import CurrentShop from "../current-shop/current-shop";
import Spacer from "../spacer/spacer";
import styles from "./customer-app.module.css";
import { useRouteMatch, Switch, Route, useHistory } from "react-router-dom";
import RegisterCustomer from "../register-customer/register-customer";
import { useShop, usePush } from "../../service/server/connection";
import ChooseTicket from "../choose-ticket/choose-ticket";
import ShowTicket from "../show-ticket/show-ticket";

interface CustomerAppProps {
  backToIndex: () => void;
}

const CustomerApp: React.FC<CustomerAppProps> = () => {
  const { push } = useHistory();
  const match = useRouteMatch();
  const shop = useShop();
  const connection = usePush();
  const [ticket, setTicket] = useState<Ticket>();
  const [registeredTicket, setRegisteredTicket] = useState<RegisteredTicket>();

  return (
    <div className={styles.root}>
      <Switch>
        <Route path={`${match.path}/`} exact>
          <CurrentShop />
          <Spacer />
          <div className={styles.screen}>
            <ChooseTicket
              onSelect={async (ticket: Ticket) => {
                setTicket(ticket);
                if (shop.needsRegistration) {
                  push(`${match.path}/register`);
                } else {
                  const result = await connection.registerTicket(
                    shop["@id"],
                    ticket
                  );
                  setRegisteredTicket(result);
                  push(`${match.path}/show-ticket`);
                }
              }}
            />
          </div>
        </Route>
        <Route path={`${match.path}/register`}>
          <CurrentShop />
          <Spacer />
          <RegisterCustomer
            onRegister={async (values) => {
              console.log("registering ticket", { ticket, values });
              const result = await connection.registerTicket(
                shop["@id"],
                ticket!,
                values
              );
              setRegisteredTicket(result);
            }}
          />
        </Route>
        <Route path={`${match.path}/show-ticket`}>
          <ShowTicket ticket={registeredTicket!} />
        </Route>
      </Switch>
    </div>
  );
};

export default CustomerApp;
