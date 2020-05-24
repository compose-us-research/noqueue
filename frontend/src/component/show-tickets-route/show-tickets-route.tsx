import React from "react";

import useLocalTickets from "../../service/tickets/use-local-tickets";
import ShowTickets from "../show-tickets/show-tickets";
import { useHistory } from "react-router-dom";

interface ShowTicketsRouteProps {
  backToIndex: () => void;
}

const ShowTicketsRoute: React.FC<ShowTicketsRouteProps> = ({ backToIndex }) => {
  const { tickets } = useLocalTickets();
  const { push } = useHistory();

  return (
    <ShowTickets
      backToIndex={backToIndex}
      navigateTo={(ticketId) => push(`/saved-tickets/${ticketId}`)}
      tickets={tickets}
    />
  );
};

export default ShowTicketsRoute;
