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
      <DayRangePicker
        name="days"
        range={{
          id: "1",
          customers: 2,
          days: { minDuration: 1, maxDuration: 1 },
          duration: { start: now, end: now },
        }}
        checkForOverlaps="others"
        fields={[]}
      />
    </Form>
  );
};
