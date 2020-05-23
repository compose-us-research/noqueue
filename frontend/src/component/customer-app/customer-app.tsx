import React, { useState, useCallback } from "react";

import { AvailableSlot } from "../../service/domain";
import CurrentShop from "../current-shop/current-shop";
import Spacer from "../spacer/spacer";
import styles from "./customer-app.module.css";
import { useRouteMatch, Switch, Route, useHistory } from "react-router-dom";
import RegisterCustomer from "../register-customer/register-customer";
import { useShop, usePush } from "../../service/server/connection";
import ChooseTicket from "../choose-ticket/choose-ticket";
import ShowTicket from "../show-ticket/show-ticket";
import useLocalTickets from "../../service/tickets/use-local-tickets";

interface CustomerAppProps {
  backToIndex: () => void;
}

const CustomerApp: React.FC<CustomerAppProps> = ({ backToIndex }) => {
  const { push } = useHistory();
  const match = useRouteMatch();
  const shop = useShop();
  const api = usePush();
  const [ticket, setTicket] = useState<AvailableSlot>();
  const { saveCustomer, saveTickets, tickets } = useLocalTickets();
  console.log({ shop });
  const onRegisterCustomer = useCallback(
    async (customer) => {
      console.log("registering ticket", { ticket, customer });
      const registeredTicket = await api.registerTicket({
        shop,
        ticket: ticket!,
        customer,
      });
      if (customer) {
        saveCustomer(customer);
      }
      saveTickets({ ...tickets, [registeredTicket.id]: registeredTicket });
      push(
        `${match.path}/show-ticket/${encodeURIComponent(registeredTicket.id)}`
      );
    },
    [api, saveTickets, shop, ticket, tickets]
  );
  const onTicketSelect = useCallback(
    async (ticket: AvailableSlot) => {
      setTicket(ticket);
      if (shop.needsRegistration) {
        push(`${match.path}/register`);
      } else {
        const registeredTicket = await api.registerTicket({
          shop,
          ticket,
        });
        saveTickets({ ...tickets, [registeredTicket.id]: registeredTicket });
        push(
          `${match.path}/show-ticket/${encodeURIComponent(registeredTicket.id)}`
        );
      }
    },
    [api, match.path, push, saveTickets, setTicket, shop, tickets]
  );
  console.log("rendering CustomerApp");

  return (
    <div className={styles.root}>
      <Switch>
        <Route path={`${match.path}/`} exact>
          <CurrentShop onClick={backToIndex} />
          <Spacer />
          <div className={styles.screen}>
            <ChooseTicket onSelect={onTicketSelect} />
          </div>
        </Route>
        <Route path={`${match.path}/register`}>
          <CurrentShop onClick={backToIndex} />
          <Spacer />
          <RegisterCustomer onRegister={onRegisterCustomer} ticket={ticket!} />
        </Route>
        <Route path={`${match.path}/show-ticket/:ticketId`}>
          <ShowTicket backToIndex={backToIndex} />
        </Route>
      </Switch>
    </div>
  );
};

export default CustomerApp;
