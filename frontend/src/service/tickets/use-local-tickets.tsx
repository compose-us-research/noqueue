import React, { useContext, useCallback, useState } from "react";
import { RegisteredTicket, TicketMap } from "../domain";

function serializeTickets(tickets: TicketMap): string {
  return JSON.stringify(tickets);
}

interface LocalTicketsContextProps {
  hasTickets: boolean;
  saveTickets: (tickets: TicketMap) => void;
  tickets: TicketMap;
}

const LocalTicketsContext = React.createContext<LocalTicketsContextProps>({
  hasTickets: false,
  saveTickets: () => {
    throw Error("LocalTicketsContext has not been properly initialized");
  },
  tickets: {},
});

interface LocalTicketsProviderProps {
  children: React.ReactNode;
}

const toRegisteredTicket = (ticket: any) =>
  ({
    ...ticket,
    start: new Date(ticket.start),
    end: new Date(ticket.end),
  } as RegisteredTicket);

export const LocalTicketsProvider: React.FC<LocalTicketsProviderProps> = ({
  children,
}) => {
  const storedTickets = localStorage.getItem("localTickets");
  const deserialized = storedTickets !== null ? JSON.parse(storedTickets) : {};
  const [tickets, setTickets] = useState<TicketMap>(() =>
    Object.fromEntries(
      Object.entries(deserialized).map(([id, pseudoTicket]) => [
        id,
        toRegisteredTicket(pseudoTicket),
      ])
    )
  );
  const saveTickets = useCallback(
    (tickets: TicketMap) => {
      const serialized = serializeTickets(tickets);
      localStorage.setItem("localTickets", serialized);
      setTickets(tickets);
    },
    [setTickets]
  );
  const hasTickets: boolean = Object.keys(tickets).length > 0;
  return (
    <LocalTicketsContext.Provider value={{ hasTickets, saveTickets, tickets }}>
      {children}
    </LocalTicketsContext.Provider>
  );
};

export default function useLocalTickets(): LocalTicketsContextProps {
  return useContext(LocalTicketsContext);
}
