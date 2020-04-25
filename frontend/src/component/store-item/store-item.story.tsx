import React from "react";
import { action } from "@storybook/addon-actions";
import { ReactComponent as BookIcon } from "../../asset/image/book-icon.svg";
import StoreItem from "./store-item";

export default {
  title: "StoreItem",
  component: StoreItem,
};

export const Default = () => (
  <StoreItem
    address="Am Bahnhofsplatz, 94032 Passau"
    icon={<BookIcon />}
    name="Buchhandlung Pustet"
    onClick={action("clicked")}
  />
);
