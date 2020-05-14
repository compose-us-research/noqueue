import React, { useState, useEffect } from "react";
import { action } from "@storybook/addon-actions";
import RangeSlider from "./range-slider";
import ReactSlider from "react-slider";

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

export const InDropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setOpen(true);
  }, [setOpen]);
  return (
    <div style={{ display: open ? "block" : "none" }}>
      <RangeSlider
        key={open ? "rs-open" : "rs-close"}
        max={60}
        min={15}
        onChange={action("changed")}
      />
    </div>
  );
};
