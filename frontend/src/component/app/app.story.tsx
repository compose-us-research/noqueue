import React from "react";
import App from "./app";

import * as mockConnection from "../../../.storybook/helper/fetcher/connection";

export default {
  title: "App",
  component: App,
};

export const Default = () => <App basename="/" />;
export const MockedShop = () => (
  <App basename="/" connection={mockConnection} />
);
