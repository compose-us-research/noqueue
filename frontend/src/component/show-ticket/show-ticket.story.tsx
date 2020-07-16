import React from "react";
import ShowTicket from "./show-ticket";
import { action } from "@storybook/addon-actions";
import { Customer, LocalTicket } from "../../service/domain";
import { useShop } from "../../service/server/connection";
import { BrowserRouter } from "react-router-dom";
import Connected from "../../../.storybook/helper/connected";

export default {
  title: "Screens/ShowTicket",
  component: ShowTicket,
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
  <Connected>
    <BrowserRouter>
      <SimpleStory />
    </BrowserRouter>
  </Connected>
);

export const WithLabel = () => (
  <Connected>
    <BrowserRouter>
      <SimpleStory
        header={(ticket) => `Dein gespeichertes Ticket für ${ticket.shop.name}`}
      />
    </BrowserRouter>
  </Connected>
);
