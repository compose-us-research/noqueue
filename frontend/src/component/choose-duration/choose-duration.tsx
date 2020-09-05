import React from "react";

import Slider from "../slider/slider";

import styles from "./choose-duration.module.css";
import { useShopFetch, useShop } from "../../service/server/connection";
import { Timeslot, Dayslot } from "../../service/domain";

interface ChooseDurationProps {
  onChange: (duration: number) => void;
}

function mapper(data: any): Timeslot[] {
  return data.member as Timeslot[];
}

const ChooseDuration: React.FC<ChooseDurationProps> = ({ onChange }) => {
  const { usesDayslots } = useShop();
  const url = usesDayslots ? `/dayslot` : `/timeslot`;
  const slots = useShopFetch<Timeslot[] | Dayslot[]>(url, { mapper });
  const minDuration =
    slots.length > 0
      ? slots.sort(
          (a: Timeslot | Dayslot, b: Timeslot | Dayslot) =>
            a.minDuration - b.minDuration
        )[0].minDuration
      : 0;
  const maxDuration =
    slots.length > 0
      ? slots.sort(
          (a: Timeslot | Dayslot, b: Timeslot | Dayslot) =>
            b.maxDuration - a.maxDuration
        )[0].maxDuration
      : 0;

  return (
    <div className={styles.root}>
      <div className={styles.duration}>
        <h2>Wie viel Zeit benötigst Du?</h2>
        <Slider
          label={usesDayslots ? "Tage" : "Minuten"}
          max={maxDuration}
          min={minDuration || 0}
          onChange={(value) => {
            if (value) {
              onChange(value as number);
            }
          }}
          step={usesDayslots ? 1 : 15}
        />
      </div>
    </div>
  );
};

export default ChooseDuration;
