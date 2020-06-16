import React from "react";
import App from "./app";

import { connection } from "../../../.storybook/helper/fetcher/connection";

export default {
  title: "App",
  component: App,
};

export const Default = () => <App />;
export const MockedShop = () => <App connection={connection} />;
