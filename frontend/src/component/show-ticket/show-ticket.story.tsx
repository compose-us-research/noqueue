import React, { Suspense } from "react";
import ShowTicket from "./show-ticket";
import { action } from "@storybook/addon-actions";
import { Customer, LocalTicket } from "../../service/domain";
import { connection } from "../../../.storybook/helper/fetcher/connection";
import { FetcherProvider, useShop } from "../../service/server/connection";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Screens/ShowTicket",
  component: ShowTicket,
  decorators: [
    (storyFn: any) => <BrowserRouter>{storyFn()}</BrowserRouter>,
    (storyFn: any) => (
      <FetcherProvider
        currentShopId="buchhandlung-pustet"
        connection={connection}
      >
        {storyFn()}
      </FetcherProvider>
    ),
  ],
};

const SimpleStory = ({ header }: { header?: (t: LocalTicket) => string }) => {
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
  const ticket: LocalTicket = {
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
