import React from "react";
import TextField from "./text-field";
import Form from "../../../.storybook/helper/form";

export default {
  title: "TextField",
  component: TextField,
};

export const Simple = () => (
  <Form>
    <TextField name="name" label="Name" />
  </Form>
);

export const WithPlaceholder = () => (
  <Form>
    <TextField name="name" label="Name" placeholder="Petra Platzhalter" />
  </Form>
);

export const Required = () => (
  <Form>
    <TextField name="name" label="Name" required />
  </Form>
);
