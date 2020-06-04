import React from "react";
import Stub from "./stub";
import { action } from "@storybook/addon-actions";

export default {
  title: "Screens/Stub",
  component: Stub,
};

export const Default = () => {
  return <Stub next={action("clicked backToIndex")} />;
};

export const WithText = () => {
  return (
    <Stub
      next={action("clicked backToIndex")}
      text="This is some additional info."
      buttonText="Changed Button Text"
    />
  );
};
