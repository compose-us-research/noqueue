import React, { useContext } from "react";
import { RegisteredTicket } from "../domain";

function serializeTickets(tickets: RegisteredTicket[]): string {
  return JSON.stringify(tickets.sort((a, b) => +a.start - +b.start));
}

function saveTickets(tickets: RegisteredTicket[]): void {
  const serialized = serializeTickets(tickets);
  localStorage.setItem("localTickets", serialized);
}

interface LocalTicketsContextProps {
  hasTickets: boolean;
  saveTickets: (tickets: RegisteredTicket[]) => void;
  tickets: RegisteredTicket[];
}

const LocalTicketsContext = React.createContext<LocalTicketsContextProps>({
  hasTickets: false,
  saveTickets: serializeTickets,
  tickets: [],
});

interface LocalTicketsProviderProps {
  children: React.ReactNode;
}

export const LocalTicketsProvider: React.FC<LocalTicketsProviderProps> = ({
  children,
}) => {
  const storedTickets = localStorage.getItem("tickets");
  const tickets: RegisteredTicket[] = storedTickets
    ? JSON.parse(storedTickets)
    : [];
  const hasTickets: boolean = tickets.length > 0;
  return (
    <LocalTicketsContext.Provider value={{ hasTickets, saveTickets, tickets }}>
      {children}
    </LocalTicketsContext.Provider>
  );
};

export default function useLocalTickets(): LocalTicketsContextProps {
  return useContext(LocalTicketsContext);
}
