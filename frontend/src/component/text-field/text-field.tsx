import React from "react";
import cn from "classnames";
import { useFormContext, Validate } from "react-hook-form";

import styles from "./text-field.module.css";

interface TextFieldProps {
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: "number" | "tel" | "text";
  validate?: Validate;
}

const TextField: React.FC<TextFieldProps> = ({
  className = undefined,
  defaultValue = undefined,
  disabled = false,
  label,
  name,
  placeholder = "",
  required = false,
  type = "text",
  validate = undefined,
}) => {
  const { errors, register } = useFormContext();
  return (
    <div
      className={cn(styles.root, className, errors[name] && styles.required)}
    >
      <label>
        <span className={styles.label}>{required ? `${label}*` : label}</span>
        <input
          className={styles.input}
          defaultValue={defaultValue}
          disabled={disabled}
          name={name}
          ref={register({ required, validate })}
          placeholder={placeholder}
          type={type}
        />
      </label>
    </div>
  );
};

export default TextField;
