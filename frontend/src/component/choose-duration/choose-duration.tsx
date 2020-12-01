import React from "react";

import Slider from "../slider/slider";

import styles from "./choose-duration.module.css";
import { useShopFetch, useShop } from "../../service/server/connection";
import { Timeslot, Dayslot } from "../../service/domain";

interface ChooseDurationProps {
  onChange: (duration: number) => void;
}

function mapper(data: any): (Dayslot | Timeslot)[] {
  return data.member;
}

const ChooseDuration: React.FC<ChooseDurationProps> = ({ onChange }) => {
  const { slotType } = useShop();
  const usesDays = slotType === "days" || slotType === "holidays";
  const url = usesDays ? `/dayslot` : `/timeslot`;
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
      : 1;

  return (
    <div className={styles.root}>
      <div className={styles.duration}>
        <h2>Wie viel Zeit benötigst Du?</h2>
        <Slider
          label={
            usesDays ? (v) => (v === 1 ? "1 Tag" : `${v} Tage`) : "Minuten"
          }
          max={maxDuration}
          min={minDuration || (usesDays ? 1 : 15)}
          onChange={(value) => {
            if (value) {
              onChange(value as number);
            }
          }}
          step={usesDays ? 1 : 15}
        />
      </div>
    </div>
  );
};

export default ChooseDuration;
