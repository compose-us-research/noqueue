import React from "react";
import { action } from "@storybook/addon-actions";
import RangeSlider from "./range-slider";

export default {
  title: "RangeSlider",
  component: RangeSlider,
};

export const Regular = () => (
  <RangeSlider max={60} min={15} onChange={action("changed")} />
);

export const Disabled = () => (
  <RangeSlider disabled onChange={action("changed")} />
);
