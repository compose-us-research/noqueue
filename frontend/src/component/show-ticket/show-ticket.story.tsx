import React from "react";
import ShowTicket from "./show-ticket";

export default {
  title: "Screens/ShowTicket",
  component: ShowTicket,
};

export const Simple = () => (
  <ShowTicket
    ticket={{
      ticketUrl: "/shop/default/ticket/1",
      start: new Date("2020-04-26Z15:30:00"),
      end: new Date("2020-04-26Z16:30:00"),
    }}
  />
);
