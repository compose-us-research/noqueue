import React from "react";
import { action } from "@storybook/addon-actions";
import { ReactComponent as BookIcon } from "../../asset/image/book-icon.svg";
import ListItem from "./list-item";

export default {
  title: "ListItem",
  component: ListItem,
};

export const Default = () => (
  <ListItem
    icon={<BookIcon />}
    label="Buchhandlung Pustet"
    onClick={action("clicked")}
    text="Am Bahnhofsplatz, 94032 Passau"
  />
);
