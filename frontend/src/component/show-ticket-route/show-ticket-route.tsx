import React, { useEffect, useMemo } from "react";

import useLocalTickets from "../../service/tickets/use-local-tickets";
import { useParams, Switch, Route, useRouteMatch } from "react-router-dom";
import ShowTicket from "../show-ticket/show-ticket";
import Stub from "../stub/stub";
import { useShopFetch } from "../../service/server/connection";
import {
  RegisteredTicket,
  LocalTicket,
  ShopConfig,
} from "../../service/domain";

interface ShowTicketRouteProps {
  backToIndex: () => void;
}

const mapper: (from: any) => RegisteredTicket = (ticket) => {
  return {
    ...ticket,
    end: new Date(ticket.end),
    start: new Date(ticket.start),
  };
};

function isLocalTicket(
  ticket: RegisteredTicket | LocalTicket
): ticket is LocalTicket {
  return (
    (ticket as LocalTicket).shop !== undefined &&
    (ticket as LocalTicket).ticketUrl !== undefined
  );
}

const ShowTicketRoute: React.FC<ShowTicketRouteProps> = ({ backToIndex }) => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const { saveTickets, tickets } = useLocalTickets();
  const { path } = useRouteMatch();
  const retrievedTicket = useShopFetch<RegisteredTicket | LocalTicket>(
    `/ticket/${ticketId}`,
    {
      mapper,
      swrOptions: {
        initialData: tickets[ticketId],
        refreshWhenOffline: false,
      },
    }
  );
  const shop = useShopFetch<ShopConfig>("/", {
    swrOptions: {
      initialData: (retrievedTicket as LocalTicket).shop,
      refreshWhenOffline: false,
    },
  });
  const ticket = useMemo(
    () =>
      isLocalTicket(retrievedTicket)
        ? retrievedTicket
        : {
            ...retrievedTicket,
            shop,
            ticketUrl: `${shop["@id"]}/ticket/${retrievedTicket.id}`,
          },
    [retrievedTicket, shop]
  );

  useEffect(() => {
    if (!tickets[ticket.id]) {
      saveTickets({ ...tickets, [ticket.id]: ticket });
    }
  }, [saveTickets, ticket, tickets]);
  return (
    <Switch>
      <Route path={`${path}/update`}>
        <Stub next={backToIndex}>
          Das Bearbeiten ist momentan noch nicht möglich.
        </Stub>
      </Route>
      <Route path={`${path}/`}>
        <ShowTicket backToIndex={backToIndex} ticket={ticket} />
      </Route>
    </Switch>
  );
};

export default ShowTicketRoute;
