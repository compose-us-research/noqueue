import React from "react";
import HolidaySelector from "./holiday-selector";
import Form from "../../../.storybook/helper/form";

export default {
  title: "HolidaySelector",
  component: HolidaySelector,
};

export const Regular = () => (
  <Form>
    <HolidaySelector name="holidays" />
  </Form>
);
