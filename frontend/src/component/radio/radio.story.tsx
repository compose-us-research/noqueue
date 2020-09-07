import React from "react";
import Radio from "./radio";
import Form from "../../../.storybook/helper/form";
import Spacer from "../spacer/spacer";

export default {
  title: "Radio",
  component: Radio,
};

export const Default = () => (
  <Form>
    <Radio name="test" value="1" label="First" />
    <Spacer />
    <Radio name="test" value="2" label="Second" />
    <Spacer />
    <Radio name="test" value="3" label="Third" />
  </Form>
);

export const MultipleRadios = () => (
  <Form>
    <Radio name="testA" value="1" label="A) First" />
    <Spacer />
    <Radio name="testA" value="2" label="A) Second" />
    <Spacer />
    <Radio name="testA" value="3" label="A) Third" />
    <Spacer />
    <Radio name="testB" value="1" label="B) First" />
    <Spacer />
    <Radio name="testB" value="2" label="B) Second" />
    <Spacer />
    <Radio name="testB" value="3" label="B) Third" />
  </Form>
);
