import React from "react";
import cn from "classnames";

import styles from "./button.module.css";

interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const noop = () => {};

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  onClick = noop,
  variant = "primary",
}) => {
  return (
    <button
      className={cn(
        styles.root,
        variant === "primary" ? styles.primary : styles.secondary,
        disabled && styles.disabled
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
