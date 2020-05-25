import React, { useState, useCallback } from "react";

import { AvailableSlot, Customer } from "../../service/domain";
import CurrentShop from "../current-shop/current-shop";
import Spacer from "../spacer/spacer";
import styles from "./customer-app.module.css";
import { useRouteMatch, Switch, Route, useHistory } from "react-router-dom";
import RegisterCustomer from "../register-customer/register-customer";
import { useShop, usePush } from "../../service/server/connection";
import ChooseTicket from "../choose-ticket/choose-ticket";
import useLocalTickets from "../../service/tickets/use-local-tickets";
import ShowTicketRoute from "../show-ticket-route/show-ticket-route";

interface CustomerAppProps {
  backToIndex: () => void;
}

const CustomerApp: React.FC<CustomerAppProps> = ({ backToIndex }) => {
  const { push } = useHistory();
  const { path, url } = useRouteMatch();
  const shop = useShop();
  const api = usePush();
  const [ticket, setTicket] = useState<AvailableSlot>();
  const { saveCustomer, saveTickets, tickets } = useLocalTickets();
  const onRegisterCustomer = useCallback(
    async (customer: Customer) => {
      const registeredTicket = await api.registerTicket({
        shop,
        ticket: ticket!,
        customer,
      });
      saveCustomer(customer);
      saveTickets({ ...tickets, [registeredTicket.id]: registeredTicket });
      push(`${url}/ticket/${registeredTicket.id}`);
    },
    [api, url, push, saveCustomer, saveTickets, shop, ticket, tickets]
  );
  const onTicketSelect = useCallback(
    async (ticket: AvailableSlot) => {
      setTicket(ticket);
      if (shop.needsRegistration) {
        push(`${url}/register`);
      } else {
        const registeredTicket = await api.registerTicket({
          shop,
          ticket,
        });
        saveTickets({ ...tickets, [registeredTicket.id]: registeredTicket });
        push(`${url}/ticket/${registeredTicket.id}`);
      }
    },
    [api, url, push, saveTickets, setTicket, shop, tickets]
  );

  return (
    <div className={styles.root}>
      <Switch>
        <Route path={`${path}/`} exact>
          <CurrentShop onClick={backToIndex} />
          <Spacer />
          <div className={styles.screen}>
            <ChooseTicket onSelect={onTicketSelect} />
          </div>
        </Route>
        <Route path={`${path}/register`}>
          <CurrentShop onClick={backToIndex} />
          <Spacer />
          <RegisterCustomer onRegister={onRegisterCustomer} ticket={ticket!} />
        </Route>
        <Route path={`${path}/ticket/:ticketId`}>
          <ShowTicketRoute backToIndex={backToIndex} />
        </Route>
      </Switch>
    </div>
  );
};

export default CustomerApp;
