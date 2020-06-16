import React, { useState } from "react";
import ListScreen, { Item } from "./list-screen";
import { action } from "@storybook/addon-actions";

export default {
  title: "Screens/ListScreen",
  component: ListScreen,
};

export const Tickets = () => {
  const [selected, setSelected] = useState<Item>();
  const one = {
    id: "/shop/default/ticket/1",
    label: "Buchhandlung Bücherwurm",
    text: "22.05.2020 10:00 - 10:30",
    action: () => {
      action("one")();
      setSelected(one);
    },
  };
  const two = {
    id: "/shop/default/ticket/2",
    label: "Nagelstudio Happy Nails",
    text: "22.05.2020 11:00 - 11:30",
    action: () => setSelected(two),
  };
  const three = {
    id: "/shop/default/ticket/3",
    label: "Fitnessstudio zum goldenen Bizeps",
    text: "22.05.2020 07:00 - 08:30",
    action: () => setSelected(three),
  };

  return (
    <ListScreen
      backToIndex={action("back to index clicked")}
      label="Was hast Du vor?"
      list={[one, two, three]}
      selected={selected}
    />
  );
};
