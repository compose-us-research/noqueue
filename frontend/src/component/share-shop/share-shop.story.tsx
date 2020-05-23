import React from "react";
import ShareShop from "./share-shop";
import { action } from "@storybook/addon-actions";

export default {
  title: "Screens/ShareShop",
  component: ShareShop,
};

export const Default = () => (
  <ShareShop backToIndex={action("clicked back to index")} />
);
