import React from "react";
import RegisterCustomer from "./register-customer";
import { action } from "@storybook/addon-actions";
import { LocalTicket } from "../../service/domain";
import { useShop } from "../../service/server/connection";
import Connected from "../../../.storybook/helper/connected";

export default {
  title: "Screens/RegisterCustomer",
  component: RegisterCustomer,
};

const RegisterWithSelectedTicket = () => {
  const shop = useShop();
  const now = Date.now();
  const ticketUrl = `${shop["@id"]}/ticket/1`;
  const ticket: LocalTicket = {
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

export const Default = () => (
  <Connected>
    <RegisterWithSelectedTicket />
  </Connected>
);
