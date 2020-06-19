import React from "react";

import Slider from "../slider/slider";

import styles from "./choose-duration.module.css";
import { useShopFetch } from "../../service/server/connection";
import { Timeslot } from "../../service/domain";

interface ChooseDurationProps {
  onChange: (duration: number) => void;
}

function mapper(data: any): Timeslot[] {
  return data.member as Timeslot[];
}

const ChooseDuration: React.FC<ChooseDurationProps> = ({ onChange }) => {
  const url = `/timeslot`;
  const timeslots = useShopFetch<Timeslot[]>(url, { mapper });
  const minDuration =
    timeslots.length > 0
      ? timeslots.sort((a, b) => a.minDuration - b.minDuration)[0].minDuration
      : 0;
  const maxDuration =
    timeslots.length > 0
      ? timeslots.sort((a, b) => b.maxDuration - a.maxDuration)[0].maxDuration
      : 0;

  return (
    <div className={styles.root}>
      <div className={styles.duration}>
        <h2>Wie viel Zeit benötigst Du?</h2>
        <Slider
          max={maxDuration}
          min={minDuration || 0}
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
