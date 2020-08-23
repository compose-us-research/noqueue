import React from "react";
import ReservableTimes from "./reservable-days";
import { action } from "@storybook/addon-actions";
import Connected from "../../../.storybook/helper/connected";

export default {
  title: "Screens/ReservableTimes",
  component: ReservableTimes,
};

export const Default = () => {
  return (
    <Connected>
      <ReservableTimes handleSubmit={action("submit")} />
    </Connected>
  );
};
