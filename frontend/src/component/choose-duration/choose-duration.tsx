import React from "react";

import Slider from "../slider/slider";

import styles from "./choose-duration.module.css";
import { useShop } from "../../service/server/connection";

interface ChooseDurationProps {
  onChange: (duration: number) => void;
}

const ChooseDuration: React.FC<ChooseDurationProps> = ({ onChange }) => {
  const shop = useShop();

  return (
    <div className={styles.root}>
      <div className={styles.duration}>
        <h2>Wie viel Zeit benötigst Du?</h2>
        <Slider
          max={shop.maxDuration}
          min={shop.minDuration || 0}
          onChange={(value) => {
            if (value) {
              onChange(value as number);
            }
          }}
          step={15}
        />
      </div>
    </div>
  );
};

export default ChooseDuration;
