import React from "react";

import { TicketMap } from "../../service/domain";
import ListScreen from "../list-screen/list-screen";

interface ShowTicketsProps {
  backToIndex: () => void;
  navigateTo: (url: string) => void;
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
          action: () => navigateTo(ticket.id),
        };
      })}
    />
  );
};

export default ShowTickets;
