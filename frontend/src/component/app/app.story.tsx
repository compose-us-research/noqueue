import React from "react";
import App from "./app";

import * as mockServer from "../../../.storybook/helper/fetcher";

export default {
  title: "App",
  component: App,
};

export const Default = () => <App />;
export const MockedShop = () => <App connection={mockServer} />;
