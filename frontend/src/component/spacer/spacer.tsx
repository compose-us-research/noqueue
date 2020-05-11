import React from "react";

interface SpacerProps {
  px?: number;
  direction?: "row" | "column";
}

const Spacer: React.FC<SpacerProps> = ({ px = 25, direction = "row" }) => {
  return (
    <div
      style={{
        flexGrow: 0,
        [direction === "row" ? "height" : "width"]: `${px}px`,
      }}
    ></div>
  );
};

export default Spacer;
