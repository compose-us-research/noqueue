import React, { Suspense } from "react";
import ShowTicket from "./show-ticket";
import { action } from "@storybook/addon-actions";
import { Customer, RegisteredTicket } from "../../service/domain";
import { useShop } from "../../service/server/connection";

export default {
  title: "Screens/ShowTicket",
  component: ShowTicket,
};

const SimpleStory = () => {
  const customer: Customer = {
    name: "Petra Platzhalter",
    contact: {
      email: "betatester@platzhalter.io",
      phone: "01234567891",
    },
  };
  const now = Date.now();
  const start = new Date(now);
  const end = new Date(now + 15 * 60 * 1000);
  const shop = useShop();
  const ticketUrl = `${shop["@id"]}/ticket/1`;
  const ticket: RegisteredTicket = {
    end,
    id: ticketUrl,
    shop,
    start,
    ticketUrl,
  };
  return (
    <ShowTicket
      backToIndex={action("clicked back to index")}
      customer={customer}
      ticket={ticket}
    />
  );
};

export const Simple = () => (
  <Suspense fallback={<div>Lade...</div>}>
    <SimpleStory />
  </Suspense>
);
