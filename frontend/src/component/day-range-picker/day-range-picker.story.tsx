import React from "react";
import DayRangePicker from "./day-range-picker";
import Form from "../../../.storybook/helper/form";

export default {
  title: "DayRangePicker",
  component: DayRangePicker,
};

export const Regular = () => {
  const now = new Date();
  return (
    <Form>
      <DayRangePicker name="days" range={{ id: "1", start: now, end: now }} />
    </Form>
  );
};
