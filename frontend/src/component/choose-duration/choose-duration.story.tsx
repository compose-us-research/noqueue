import React from "react";
import ChooseDuration from "./choose-duration";
import { action } from "@storybook/addon-actions";

export default {
  title: "Screens/ChooseDuration",
  component: ChooseDuration,
};

export const Default10 = () => (
  <ChooseDuration defaultValue={10} onChange={action("choose slot")} />
);
