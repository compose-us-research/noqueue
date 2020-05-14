import React from "react";
import RegisterCustomer from "./register-customer";
import { action } from "@storybook/addon-actions";

export default {
  title: "Screens/RegisterCustomer",
  component: RegisterCustomer,
};

export const Default = () => (
  <RegisterCustomer onRegister={action("register")} />
);
