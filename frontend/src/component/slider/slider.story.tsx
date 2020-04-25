import React from "react";
import { action } from "@storybook/addon-actions";
import Slider from "./slider";

export default {
  title: "Slider",
  component: Slider,
};

export const Regular = () => <Slider onChange={action("changed")} />;

export const Disabled = () => <Slider disabled onChange={action("changed")} />;
