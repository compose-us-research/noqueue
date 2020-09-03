import React from "react";
import { action } from "@storybook/addon-actions";
import Slider from "./slider";

export default {
  title: "Slider",
  component: Slider,
};

export const Regular = () => (
  <Slider max={60} min={15} onChange={action("changed")} />
);

export const Days = () => (
  <Slider label="Tage" max={7} min={1} step={1} onChange={action("changed")} />
);

export const Disabled = () => <Slider disabled onChange={action("changed")} />;
