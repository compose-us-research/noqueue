import React from "react";

import useLocalTickets from "../../service/tickets/use-local-tickets";
import { useParams, Switch, Route, useRouteMatch } from "react-router-dom";
import ShowTicket from "../show-ticket/show-ticket";
import Stub from "../stub/stub";

interface ShowTicketRouteProps {
  backToIndex: () => void;
}

const ShowTicketRoute: React.FC<ShowTicketRouteProps> = ({ backToIndex }) => {
  const { ticketId } = useParams();
  const { tickets } = useLocalTickets();
  const { path } = useRouteMatch();
  const ticket = tickets[ticketId];
  return (
    <Switch>
      <Route path={`${path}/update`}>
        <Stub
          next={backToIndex}
          text="Das Bearbeiten ist momentan noch nicht möglich."
        />
      </Route>
      <Route path={`${path}/`}>
        <ShowTicket backToIndex={backToIndex} ticket={ticket} />
      </Route>
    </Switch>
  );
};

export default ShowTicketRoute;
