import React from "react";

import styles from "./header.module.css";

interface HeaderProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const noop = () => {};

const Header: React.FC<HeaderProps> = ({ children, onClick = noop }) => {
  return (
    <div className={styles.root} onClick={onClick}>
      {children}
    </div>
  );
};

export default Header;
