import React from "react";
import ChooseSlot from "./choose-slot";
import { action } from "@storybook/addon-actions";

export default {
  title: "Screens/ChooseSlot",
  component: ChooseSlot,
};

export const Simple = () => (
  <ChooseSlot
    onSelect={action("reserved slot")}
    slots={[
      {
        id: 1,
        from: new Date("2020-04-26Z15:30:00"),
        to: new Date("2020-04-26Z16:30:00"),
      },
      {
        id: 2,
        from: new Date("2020-04-26Z16:15:00"),
        to: new Date("2020-04-26Z16:30:00"),
      },
      {
        id: 3,
        from: new Date("2020-04-26Z14:15:00"),
        to: new Date("2020-04-26Z14:30:00"),
      },
      {
        id: 4,
        from: new Date("2020-04-26Z17:15:00"),
        to: new Date("2020-04-26Z18:30:00"),
      },
      {
        id: 5,
        from: new Date("2020-04-26Z18:15:00"),
        to: new Date("2020-04-26Z18:30:00"),
      },
    ]}
  />
);
