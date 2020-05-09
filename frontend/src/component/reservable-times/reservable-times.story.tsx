import React from "react";
import ReservableTimes from "./reservable-times";
import { action } from "@storybook/addon-actions";

export default {
  title: "Screens/ReservableTimes",
  component: ReservableTimes,
};

export const Default = () => {
  console.log("rendering Default");
  return <ReservableTimes handleSubmit={action("submit")} ranges={[]} />;
};
