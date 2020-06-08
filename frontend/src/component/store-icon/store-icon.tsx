import React from "react";

import styles from "./store-icon.module.css";

interface StoreIconProps {
  name: string;
}

const StoreIcon: React.FC<StoreIconProps> = ({ name }) => {
  const firstLetter = name.slice(0, 1).toUpperCase();
  return <div className={styles.root} aria-hidden>{firstLetter}</div>;
};

export default StoreIcon;
