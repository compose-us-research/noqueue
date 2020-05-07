import React from "react";
import ReservableTimes from "./reservable-times";
import { action } from "@storybook/addon-actions";

export default {
  title: "Screens/ReservableTimes",
  component: ReservableTimes,
};

export const Default = () => (
  <ReservableTimes handleSubmit={action("submit")} ranges={[]} />
);
