import React from "react";
import ChooseDay from "./choose-day";
import { action } from "@storybook/addon-actions";

export default {
  title: "Screens/ChooseDay",
  component: ChooseDay,
};

export const Default = () => <ChooseDay chooseSlot={action("choose slot")} />;
