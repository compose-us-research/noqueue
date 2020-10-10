import React, { useState } from "react";
import AvailableTickets from "./available-tickets";
import { action } from "@storybook/addon-actions";
import Connected from "../../../.storybook/helper/connected";
import { AvailableSlot } from "../../service/domain";

export default {
  title: "AvailableTickets",
  component: AvailableTickets,
};

export const Simple = () => {
  const now = Date.now();
  const start = new Date(now);
  const end = new Date(now + 5 * 24 * 60 * 60 * 1000);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot>();

  return (
    <Connected>
      <AvailableTickets
        duration={15}
        end={end}
        onSelect={(slot) => {
          setSelectedSlot(slot);
          action("onSelect")(slot);
        }}
        selectedSlot={selectedSlot}
        start={start}
        usesDays={false}
      />
    </Connected>
  );
};
export const UsingDays = () => {
  const now = Date.now();
  const start = new Date(now);
  const end = new Date(now + 20 * 24 * 60 * 60 * 1000);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot>();

  return (
    <Connected shopId="feature-festival">
      <AvailableTickets
        duration={2}
        end={end}
        onSelect={(slot) => {
          setSelectedSlot(slot);
          action("onSelect")(slot);
        }}
        selectedSlot={selectedSlot}
        start={start}
        usesDays={true}
      />
    </Connected>
  );
};
