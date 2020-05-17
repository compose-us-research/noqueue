import React, { Suspense } from "react";
import AvailableTimeslots from "./available-timeslots";
import { action } from "@storybook/addon-actions";

export default {
  title: "AvailableTimeslots",
  component: AvailableTimeslots,
};

export const Simple = () => (
  <Suspense fallback={<div>Loading</div>}>
    <AvailableTimeslots duration={5} onSelect={action("onSelect")} />
  </Suspense>
);
