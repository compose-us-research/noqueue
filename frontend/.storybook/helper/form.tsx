import React from "react";
import TextField from "./text-field";
import { FormContext, useForm } from "react-hook-form";
import { action } from "@storybook/addon-actions";

interface FormProps {
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ children }) => {
  const methods = useForm();
  return (
    <form onSubmit={methods.handleSubmit(action("submit"))}>
      <FormContext {...methods}>
        {children}
        <button type="submit">submit</button>
      </FormContext>
    </form>
  );
};

export default Form;
