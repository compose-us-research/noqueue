import React from "react";
import Connected from "../../../.storybook/helper/connected";
import ChooseDuration from "./choose-duration";
import { action } from "@storybook/addon-actions";

export default {
  title: "Screens/ChooseDuration",
  component: ChooseDuration,
};

export const Default = () => (
  <Connected>
    <ChooseDuration onChange={action("choose slot")} />
  </Connected>
);
