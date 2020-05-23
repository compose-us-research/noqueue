import React from "react";

import { Customer } from "../../service/domain";
import useLocalTickets from "../../service/tickets/use-local-tickets";
import { useParams } from "react-router-dom";
import ShowTicket from "../show-ticket/show-ticket";

interface ShowTicketRouteProps {
  backToIndex: () => void;
  customer?: Customer;
}

const ShowTicketRoute: React.FC<ShowTicketRouteProps> = ({
  backToIndex,
  customer,
}) => {
  const { ticketId: ticketIdParam } = useParams();
  const ticketId = decodeURIComponent(ticketIdParam);
  const { tickets } = useLocalTickets();
  const ticket = tickets[ticketId];
  return (
    <ShowTicket backToIndex={backToIndex} customer={customer} ticket={ticket} />
  );
};

export default ShowTicketRoute;
