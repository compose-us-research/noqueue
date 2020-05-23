import React, { Suspense } from "react";
import AvailableTickets from "./available-tickets";
import { action } from "@storybook/addon-actions";

export default {
  title: "AvailableTickets",
  component: AvailableTickets,
};

export const Simple = () => {
  const now = Date.now();
  const start = new Date(now);
  const end = new Date(now + 5 * 24 * 60 * 60 * 1000);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <AvailableTickets
        duration={15}
        end={end}
        onSelect={action("onSelect")}
        start={start}
      />
    </Suspense>
  );
};
