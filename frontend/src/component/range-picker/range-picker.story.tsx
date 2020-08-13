import React from "react";
import RangePicker from "./range-picker";
import Form from "../../../.storybook/helper/form";

export default {
  title: "RangePicker",
  component: RangePicker,
};

export const Regular = () => (
  <Form>
    <RangePicker name="days" />
  </Form>
);
