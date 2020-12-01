import React from "react";
import ReservableDays from "./reservable-days";
import { action } from "@storybook/addon-actions";
import Connected from "../../../.storybook/helper/connected";

export default {
  title: "Screens/ReservableDays",
  component: ReservableDays,
};

export const Default = () => {
  return (
    <Connected shopId="feature-festival">
      <ReservableDays handleSubmit={action("submit")} />
    </Connected>
  );
};
