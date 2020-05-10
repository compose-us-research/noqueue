import React from "react";
import cn from "classnames";
import { useFormContext, Validate } from "react-hook-form";

import styles from "./text-field.module.css";

interface TextFieldProps {
  className?: string;
  defaultValue?: string;
  label: string;
  name: string;
  required?: boolean;
  type?: "number" | "tel" | "text";
  validate?: Validate;
}

const TextField: React.FC<TextFieldProps> = ({
  className = undefined,
  defaultValue = undefined,
  label,
  name,
  required = false,
  type = "text",
  validate = undefined,
}) => {
  const { errors, register } = useFormContext();
  const placeholder = required ? `${label}*` : label;
  return (
    <div
      className={cn(styles.root, className, errors[name] && styles.required)}
    >
      <input
        className={styles.input}
        defaultValue={defaultValue}
        name={name}
        ref={register({ required, validate })}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default TextField;
