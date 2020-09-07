import React from "react";
import Radio from "./radio";
import Form from "../../../.storybook/helper/form";

export default {
  title: "Radio",
  component: Radio,
};

export const Default = () => (
  <Form>
    <Radio name="test" value="1" label="First" />
    <Radio name="test" value="2" label="Second" />
    <Radio name="test" value="3" label="Third" />
  </Form>
);
