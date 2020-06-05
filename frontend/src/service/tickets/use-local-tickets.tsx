import React, { useContext, useCallback, useState } from "react";
import { TicketMap, Customer, LocalTicket } from "../domain";

function serializeTickets(tickets: TicketMap): string {
  return JSON.stringify(tickets);
}

function serializeCustomer(customer: Customer): string {
  return JSON.stringify(customer);
}

interface LocalTicketsContextProps {
  customer?: Customer;
  hasTickets: boolean;
  saveCustomer: (customer: Customer) => void;
  saveTickets: (tickets: TicketMap) => void;
  tickets: TicketMap;
}

const notInitialized: () => void = () => {
  throw Error("LocalTicketsContext has not been properly initialized");
};

const LocalTicketsContext = React.createContext<LocalTicketsContextProps>({
  hasTickets: false,
  saveCustomer: notInitialized,
  saveTickets: notInitialized,
  tickets: {},
});

interface LocalTicketsProviderProps {
  children: React.ReactNode;
}

export const toRegisteredTicket = (ticket: any) =>
  ({
    ...ticket,
    start: new Date(ticket.start),
    end: new Date(ticket.end),
  } as LocalTicket);

export const LocalTicketsProvider: React.FC<LocalTicketsProviderProps> = ({
  children,
}) => {
  const storedTickets = localStorage.getItem("localTickets");
  const storedCustomer = localStorage.getItem("localCustomer");
  const deserialized = storedTickets !== null ? JSON.parse(storedTickets) : {};
  const [customer, setCustomer] = useState<Customer>(() =>
    storedCustomer ? JSON.parse(storedCustomer) : undefined
  );
  const [tickets, setTickets] = useState<TicketMap>(() =>
    Object.fromEntries(
      Object.entries(deserialized).map(([id, pseudoTicket]) => [
        id,
        toRegisteredTicket(pseudoTicket),
      ])
    )
  );
  const saveCustomer = useCallback(
    (customer: Customer) => {
      const serialized = serializeCustomer(customer);
      localStorage.setItem("localCustomer", serialized);
      setCustomer(customer);
    },
    [setCustomer]
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
    <LocalTicketsContext.Provider
      value={{ customer, hasTickets, saveTickets, saveCustomer, tickets }}
    >
      {children}
    </LocalTicketsContext.Provider>
  );
};

export default function useLocalTickets(): LocalTicketsContextProps {
  return useContext(LocalTicketsContext);
}
