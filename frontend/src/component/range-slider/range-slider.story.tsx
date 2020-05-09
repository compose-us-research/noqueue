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

export const TestDropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setOpen(true);
  }, [setOpen]);
  return (
    <div style={{ display: open ? "block" : "none", width: "100%" }}>
      <ReactSlider
        // key={open ? "rs-open" : "rs-close"}
        defaultValue={[15, 60]}
        max={60}
        min={5}
        onChange={action("changed")}
        renderThumb={(props, state) => (
          <div
            {...props}
            style={{
              ...props.style,
              backgroundColor: "#000",
              color: "#fff",
              padding: 10,
            }}
          >
            {state.valueNow}
          </div>
        )}
        renderTrack={(props, state) => (
          <div
            {...props}
            style={{
              ...props.style,
              border: "20px solid #f00",
            }}
          ></div>
        )}
      />
    </div>
  );
};
