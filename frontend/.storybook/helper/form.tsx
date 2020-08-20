import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { action } from "@storybook/addon-actions";

interface FormProps {
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ children }) => {
  const methods = useForm();
  return (
    <form onSubmit={methods.handleSubmit(action("submit"))}>
      <FormProvider {...methods}>
        {children}
        <button type="submit">submit</button>
      </FormProvider>
    </form>
  );
};

export default Form;
