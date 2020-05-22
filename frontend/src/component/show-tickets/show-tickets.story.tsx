import React from "react";
import ShowTickets from "./show-tickets";
import { action } from "@storybook/addon-actions";

export default {
  title: "Screens/ShowTickets",
  component: ShowTickets,
};

export const Simple = () => (
  <ShowTickets
    backToIndex={action("back to index clicked")}
    tickets={{
      "1": {
        id: "1",
        ticketUrl: "/shop/default/ticket/1",
        shopName: "Nagelstudio Happy Nails",
        start: new Date("2020-04-26Z15:30:00"),
        end: new Date("2020-04-26Z16:30:00"),
      },
    }}
  />
);
