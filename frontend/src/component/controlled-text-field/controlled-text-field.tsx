import React, { ChangeEvent } from "react";
import cn from "classnames";

import styles from "./controlled-text-field.module.css";

interface ControlledTextFieldProps {
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
  label: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: "number" | "tel" | "text";
  value: string;
}

const ControlledTextField: React.FC<ControlledTextFieldProps> = ({
  className = undefined,
  disabled = false,
  hasError = false,
  label,
  name,
  onChange,
  placeholder = "",
  required = false,
  type = "text",
  value = "",
}) => {
  return (
    <div className={cn(styles.root, className, hasError && styles.required)}>
      <label>
        <span className={styles.label}>{required ? `${label}*` : label}</span>
        <input
          className={styles.input}
          disabled={disabled}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </label>
    </div>
  );
};

export default ControlledTextField;
