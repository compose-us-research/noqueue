import React from "react";
import { action } from "@storybook/addon-actions";
import { ReactComponent as BookIcon } from "../../asset/image/book-icon.svg";
import ListItem from "../list-item/list-item";
import Header from "./header";

export default {
  title: "Header",
  component: Header,
};

export const Simple = () => <Header>This is a simple header.</Header>;

export const WithListItem = () => (
  <Header>
    <ListItem
      icon={<BookIcon />}
      label="Buchhandlung Pustet"
      onClick={action("clicked")}
      text="Am Bahnhofsplatz, 94032 Passau"
    />
  </Header>
);
