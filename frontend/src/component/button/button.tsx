import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const noop = () => {};

const Button: React.FC<ButtonProps> = ({ children, onClick = noop }) => {
  return <button type="button">{children}</button>;
};

export default Button;
