import React from "react";
import ChooseRole from "./choose-role";
import { action } from "@storybook/addon-actions";

export default {
  title: "Screens/ChooseRole",
  component: ChooseRole,
};

export const Default = () => (
  <ChooseRole
    selectCustomerRole={action("selected customer role")}
    selectShopRole={action("selected shop role")}
  />
);
