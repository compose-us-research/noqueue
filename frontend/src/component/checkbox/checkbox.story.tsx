import React from "react";
import Checkbox from "./checkbox";
import Form from "../../../.storybook/helper/form";

export default {
  title: "Checkbox",
  component: Checkbox,
};

export const Simple = () => (
  <Form>
    <Checkbox name="name" label="Is this correct?" />
  </Form>
);
