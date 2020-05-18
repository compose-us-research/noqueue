import React from "react";
import ChooseTicket from "./choose-ticket";
import { action } from "@storybook/addon-actions";

export default {
  title: "Screens/ChooseTicket",
  component: ChooseTicket,
};

export const Simple = () => <ChooseTicket onSelect={action("reserved slot")} />;
