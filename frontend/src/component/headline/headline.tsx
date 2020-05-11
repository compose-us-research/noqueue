import React from "react";
import { ReactComponent as HeadlineBackground } from "../../asset/image/headline.svg";
import styles from "./headline.module.css";

interface HeadlineProps {}

const Headline: React.FC<HeadlineProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <HeadlineBackground preserveAspectRatio="none" width="100%" />
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default Headline;
