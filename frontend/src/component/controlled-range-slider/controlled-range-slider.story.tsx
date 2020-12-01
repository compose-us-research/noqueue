import React, { useState, useEffect } from "react";
import ControlledRangeSlider from "./controlled-range-slider";

export default {
  title: "ControlledRangeSlider",
  component: ControlledRangeSlider,
};

export const Regular = () => {
  const [value, setValue] = useState<[number, number]>([15, 60]);
  return (
    <ControlledRangeSlider
      label="Tage"
      max={7}
      min={1}
      minDistance={0}
      onChange={(values) => {
        if (Array.isArray(values)) {
          setValue(values as [number, number]);
        }
      }}
      step={1}
      value={value}
    />
  );
};

export const Disabled = () => {
  const [value, setValue] = useState<[number, number]>([15, 60]);
  return (
    <ControlledRangeSlider
      disabled
      onChange={(values) => {
        if (Array.isArray(values)) {
          setValue(values as [number, number]);
        }
      }}
      value={value}
    />
  );
};

export const InDropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setOpen(true);
  }, [setOpen]);
  const [value, setValue] = useState<[number, number]>([15, 60]);
  return (
    <div style={{ display: open ? "block" : "none" }}>
      <ControlledRangeSlider
        key={open ? "rs-open" : "rs-close"}
        max={60}
        min={15}
        onChange={(values) => {
          if (Array.isArray(values)) {
            setValue(values as [number, number]);
          }
        }}
        value={value}
      />
    </div>
  );
};
