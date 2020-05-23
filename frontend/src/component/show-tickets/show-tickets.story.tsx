import React, { Suspense } from "react";
import ShowTickets from "./show-tickets";
import { action } from "@storybook/addon-actions";
import { useShop } from "../../service/server/connection";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "Screens/ShowTickets",
  component: ShowTickets,
};

const SimpleStory = () => {
  const shop = useShop();
  return (
    <ShowTickets
      backToIndex={action("back to index clicked")}
      tickets={{
        "1": {
          end: new Date("2020-04-26Z16:30:00"),
          id: "1",
          shop,
          start: new Date("2020-04-26Z15:30:00"),
          ticketUrl: "/shop/default/ticket/1",
        },
      }}
    />
  );
};

export const Simple = () => (
  <Router>
    <Suspense fallback={<div>Lade...</div>}>
      <SimpleStory />
    </Suspense>
  </Router>
);
