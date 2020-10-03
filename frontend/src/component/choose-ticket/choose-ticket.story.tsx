import React from "react";
import ChooseTicket from "./choose-ticket";
import { action } from "@storybook/addon-actions";
import Connected from "../../../.storybook/helper/connected";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Screens/ChooseTicket",
  component: ChooseTicket,
};

export const TimeslotShop = () => (
  <Connected>
    <BrowserRouter>
      <ChooseTicket onSelect={action("reserved slot")} />
    </BrowserRouter>
  </Connected>
);

export const DayslotShop = () => (
  <Connected shopId="lovely-landmark">
    <BrowserRouter>
      <ChooseTicket onSelect={action("reserved slot")} />
    </BrowserRouter>
  </Connected>
);

export const HolidayShop = () => (
  <Connected shopId="feature-festival">
    <BrowserRouter>
      <ChooseTicket onSelect={action("reserved slot")} />
    </BrowserRouter>
  </Connected>
);
