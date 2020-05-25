import React from "react";
import RegisterCustomer from "./register-customer";
import { action } from "@storybook/addon-actions";
import { RegisteredTicket } from "../../service/domain";
import { useShop } from "../../service/server/connection";

export default {
  title: "Screens/RegisterCustomer",
  component: RegisterCustomer,
};

export const Default = () => {
  const shop = useShop();
  const now = Date.now();
  const ticketUrl = `${shop["@id"]}/ticket/1`;
  const ticket: RegisteredTicket = {
    contact: {
      name: "Petra Platzhalter",
      contact: { email: "betatester@platzhalter.io" },
    },
    end: new Date(now + 15 * 60 * 1000),
    id: ticketUrl,
    shop,
    start: new Date(now),
    ticketUrl,
  };
  return <RegisterCustomer onRegister={action("register")} ticket={ticket} />;
};
