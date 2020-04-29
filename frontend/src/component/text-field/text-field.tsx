import React from "react";
import cn from "classnames";
import { useFormContext } from "react-hook-form";

import styles from "./text-field.module.css";

interface TextFieldProps {
  className?: string;
  label: string;
  name: string;
  required?: boolean;
  type?: "number" | "tel" | "text";
}

const TextField: React.FC<TextFieldProps> = ({
  className = undefined,
  label,
  name,
  required = false,
  type = "text",
}) => {
  const { errors, register } = useFormContext();
  const placeholder = required ? `${label}*` : label;
  return (
    <div
      className={cn(styles.root, className, errors[name] && styles.required)}
    >
      <input
        className={styles.input}
        name={name}
        ref={register({ required })}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default TextField;
