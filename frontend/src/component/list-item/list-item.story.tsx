import React from "react";
import { action } from "@storybook/addon-actions";
import ListItem from "./list-item";
import StoreIcon from "../store-icon/store-icon";

export default {
  title: "ListItem",
  component: ListItem,
};

export const Default = () => (
  <ListItem
    icon={<StoreIcon name="Buchhandlung Pustet" />}
    label="Buchhandlung Pustet"
    onClick={action("clicked")}
    text="Am Bahnhofsplatz, 94032 Passau"
  />
);
