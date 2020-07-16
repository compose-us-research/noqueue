import React, { Suspense } from "react";
import ShowTickets from "./show-tickets";
import { action } from "@storybook/addon-actions";
import { useShop } from "../../service/server/connection";
import Connected from "../../../.storybook/helper/connected";

export default {
  title: "Screens/ShowTickets",
  component: ShowTickets,
};

const SimpleStory = () => {
  const shop = useShop();
  return (
    <ShowTickets
      backToIndex={action("back to index clicked")}
      navigateTo={action("navigate to")}
      tickets={{
        "1": {
          contact: {
            name: "Petra Platzhalter",
            contact: { email: "betatester@platzhalter.io" },
          },
          end: new Date("2020-04-26Z16:30:00"),
          id: "1",
          shop,
          start: new Date("2020-04-26Z15:30:00"),
          ticketUrl: "/shop/default/ticket/1",
        },
        "2": {
          contact: {
            name: "Petra Platzhalter",
            contact: { email: "betatester@platzhalter.io" },
          },
          end: new Date("2020-04-27Z16:30:00"),
          id: "2",
          shop,
          start: new Date("2020-04-26Z15:30:00"),
          ticketUrl: "/shop/default/ticket/1",
        },
        "3": {
          contact: {
            name: "Petra Platzhalter",
            contact: { email: "betatester@platzhalter.io" },
          },
          end: new Date("2020-04-28Z16:30:00"),
          id: "3",
          shop,
          start: new Date("2020-04-26Z15:30:00"),
          ticketUrl: "/shop/default/ticket/1",
        },
      }}
    />
  );
};

export const Simple = () => (
  <Connected>
    <SimpleStory />
  </Connected>
);
