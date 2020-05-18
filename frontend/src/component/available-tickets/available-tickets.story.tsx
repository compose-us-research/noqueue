import React, { Suspense } from "react";
import AvailableTickets from "./available-tickets";
import { action } from "@storybook/addon-actions";

export default {
  title: "AvailableTickets",
  component: AvailableTickets,
};

export const Simple = () => (
  <Suspense fallback={<div>Loading</div>}>
    <AvailableTickets duration={5} onSelect={action("onSelect")} />
  </Suspense>
);
