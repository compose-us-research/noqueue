import React from "react";
import cn from "classnames";

import styles from "./button.module.css";

export type ButtonVariants = "primary" | "secondary" | "unselected";
export type ButtonType = "button" | "submit";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: ButtonType;
  variant?: ButtonVariants;
}

const noop = () => {};

const Button: React.FC<ButtonProps> = ({
  children,
  className = undefined,
  disabled = false,
  onClick = noop,
  type = "button",
  variant = "primary",
}) => {
  return (
    <button
      className={cn(
        styles.root,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "unselected" && styles.unselected,
        disabled && styles.disabled,
        className
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
