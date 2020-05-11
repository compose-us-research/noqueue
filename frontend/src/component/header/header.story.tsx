import React from "react";
import { action } from "@storybook/addon-actions";
import { ReactComponent as BookIcon } from "../../asset/image/book-icon.svg";
import StoreItem from "../store-item/store-item";
import Header from "./header";

export default {
  title: "Header",
  component: Header,
};

export const Simple = () => <Header>This is a simple header.</Header>;

export const WithStoreItem = () => (
  <Header>
    <StoreItem
      address="Am Bahnhofsplatz, 94032 Passau"
      icon={<BookIcon />}
      name="Buchhandlung Pustet"
      onClick={action("clicked")}
    />
  </Header>
);
