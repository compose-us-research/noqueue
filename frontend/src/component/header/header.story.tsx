import React from "react";
import { action } from "@storybook/addon-actions";
import ListItem from "../list-item/list-item";
import Header from "./header";
import StoreIcon from "../store-icon/store-icon";

export default {
  title: "Header",
  component: Header,
};

export const Simple = () => <Header>This is a simple header.</Header>;

export const WithListItem = () => (
  <Header>
    <ListItem
      icon={<StoreIcon name="Buchhandlung Pustet" />}
      label="Buchhandlung Pustet"
      onClick={action("clicked")}
      text="Am Bahnhofsplatz, 94032 Passau"
    />
  </Header>
);
