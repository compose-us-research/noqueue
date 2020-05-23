import React from "react";

import { TicketMap } from "../../service/domain";
import ListScreen from "../list-screen/list-screen";
import { useHistory } from "react-router-dom";

interface ShowTicketsProps {
  backToIndex: () => void;
  tickets: TicketMap;
}

const ShowTickets: React.FC<ShowTicketsProps> = ({ backToIndex, tickets }) => {
  const { push } = useHistory();
  return (
    <ListScreen
      backToIndex={backToIndex}
      label="Deine gespeicherten Tickets"
      list={Object.values(tickets).map((ticket) => {
        return {
          id: ticket.id,
          label: `${ticket.shop.name}`,
          text: `${ticket.start.toTimeString()}-${ticket.end.toTimeString()}`,
          action: () =>
            push(`/customer/show-ticket/${encodeURIComponent(ticket.id)}`),
        };
      })}
    />
  );
};

export default ShowTickets;
