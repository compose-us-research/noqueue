import React from "react";

import { TicketMap, LocalTicket } from "../../service/domain";
import ListScreen from "../list-screen/list-screen";

interface ShowTicketsProps {
  backToIndex: () => void;
  navigateTo: (ticket: LocalTicket) => void;
  tickets: TicketMap;
}

const ShowTickets: React.FC<ShowTicketsProps> = ({
  backToIndex,
  navigateTo,
  tickets,
}) => {
  return (
    <ListScreen
      backToIndex={backToIndex}
      label="Deine gespeicherten Tickets"
      list={Object.values(tickets).map((ticket) => {
        return {
          id: ticket.id,
          label: `${ticket.shop.name}`,
          text: `${ticket.start.toLocaleString()} - ${ticket.end.toLocaleString()}`,
          action: () => navigateTo(ticket),
        };
      })}
    />
  );
};

export default ShowTickets;
