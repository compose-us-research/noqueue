import React, { Suspense } from "react";
import AvailableTimeslots from "./available-timeslots";
import { action } from "@storybook/addon-actions";

export default {
  title: "AvailableTimeslots",
  component: AvailableTimeslots,
};

export const Simple = () => (
  <Suspense fallback={<div>Loading</div>}>
    <AvailableTimeslots
      navigateToSlotSelection={action("navigate to slot selection")}
      day={new Date()}
      duration={5}
    />
  </Suspense>
);
