import React from "react";
import UpdateShop from "./update-shop";
import { action } from "@storybook/addon-actions";

export default {
  title: "Screens/UpdateShop",
  component: UpdateShop,
};

export const Default = () => <UpdateShop onSave={action("updated")} />;
