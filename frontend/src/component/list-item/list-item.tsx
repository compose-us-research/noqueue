import React from "react";
import styles from "./list-item.module.css";

interface ListItemProps {
  label: string;
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

const noop = () => {};

const ListItem: React.FC<ListItemProps> = ({
  text,
  icon,
  label,
  onClick = noop,
}) => {
  return (
    <div className={styles.root} onClick={onClick}>
      {icon}
      <div className={styles.info}>
        <div className={styles.label}>{label}</div>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};

export default ListItem;
