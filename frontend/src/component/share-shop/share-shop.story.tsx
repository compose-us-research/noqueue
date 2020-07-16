import React from "react";
import ShareShop from "./share-shop";
import { action } from "@storybook/addon-actions";
import Connected from "../../../.storybook/helper/connected";

export default {
  title: "Screens/ShareShop",
  component: ShareShop,
};

export const Default = () => (
  <Connected>
    <ShareShop backToIndex={action("clicked back to index")} />
  </Connected>
);
