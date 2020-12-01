import React, { useState } from "react";
import ControlledTextField from "./controlled-text-field";

export default {
  title: "ControlledTextField",
  component: ControlledTextField,
};

export const Simple = () => {
  const [value, setValue] = useState("");
  return (
    <ControlledTextField
      name="name"
      label="Name"
      onChange={(event) => setValue(event.target.value)}
      value={value}
    />
  );
};

export const WithPlaceholder = () => {
  const [value, setValue] = useState("");
  return (
    <ControlledTextField
      name="name"
      label="Name"
      onChange={(event) => setValue(event.target.value)}
      placeholder="Petra Platzhalter"
      value={value}
    />
  );
};

export const Required = () => {
  const [value, setValue] = useState("");
  return (
    <ControlledTextField
      name="name"
      label="Name"
      required
      onChange={(event) => setValue(event.target.value)}
      value={value}
    />
  );
};
