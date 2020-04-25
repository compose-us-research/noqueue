import React from "react";
import styles from "./store-item.module.css";

interface StoreItemProps {
  address: string;
  icon: React.ReactNode;
  name: string;
  onClick?: () => void;
}

const noop = () => {};

const StoreItem: React.FC<StoreItemProps> = ({
  address,
  icon,
  name,
  onClick = noop,
}) => {
  return (
    <div className={styles.root} onClick={onClick}>
      {icon}
      <div className={styles.storeInfo}>
        <div className={styles.name}>{name}</div>
        <div className={styles.address}>{address}</div>
      </div>
    </div>
  );
};

export default StoreItem;
