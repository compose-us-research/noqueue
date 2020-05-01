import React from "react";
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
