import React, { Suspense } from "react";
import ShowTicket from "./show-ticket";
import { action } from "@storybook/addon-actions";
import { Customer, RegisteredTicket } from "../../service/domain";
import { useShop } from "../../service/server/connection";
import idToLink from "../../lib/id-to-link/id-to-link";

export default {
  title: "Screens/ShowTicket",
  component: ShowTicket,
};

const SimpleStory = ({
  header,
}: {
  header?: (t: RegisteredTicket) => string;
}) => {
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
  const ticketUrl = `${idToLink(shop["@id"])}/ticket/1`;
  const ticket: RegisteredTicket = {
    contact: customer,
    end,
    id: ticketUrl,
    shop,
    start,
    ticketUrl,
  };
  return (
    <ShowTicket
      backToIndex={action("clicked back to index")}
      label={header?.apply(header, [ticket])}
      ticket={ticket}
    />
  );
};

export const Simple = () => (
  <Suspense fallback={<div>Lade...</div>}>
    <SimpleStory />
  </Suspense>
);

export const WithLabel = () => (
  <Suspense fallback={<div>Lade...</div>}>
    <SimpleStory
      header={(ticket) => `Dein gespeichertes Ticket für ${ticket.shop.name}`}
    />
  </Suspense>
);
