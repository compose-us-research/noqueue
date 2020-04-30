import React from "react";
import { action } from "@storybook/addon-actions";
import DaySelector from "./day-selector";
import Form from "../../../.storybook/helper/form";

export default {
  title: "DaySelector",
  component: DaySelector,
};

export const Regular = () => (
  <Form>
    <DaySelector name="day" />
  </Form>
);
