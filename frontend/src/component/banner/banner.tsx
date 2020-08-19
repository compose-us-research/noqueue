import React from "react";

import styles from "./banner.module.css";

interface BannerProps {
  children?: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default Banner;
