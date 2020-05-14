import React from "react";
import RegisterShop from "./register-shop";
import { action } from "@storybook/addon-actions";

export default {
  title: "Screens/RegisterShop",
  component: RegisterShop,
};

export const Default = () => <RegisterShop onRegister={action("register")} />;
