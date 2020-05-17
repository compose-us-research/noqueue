import React, { useMemo, useState } from "react";

import Button from "../button/button";

import styles from "./available-timeslots.module.css";
import { useFetch, useShop } from "../../service/server/connection";
import { Timeslot } from "../../service/domain";

interface AvailableTimeslotsProps {
  duration: number;
  onSelect: (slot: Timeslot) => void;
}

const AvailableTimeslots: React.FC<AvailableTimeslotsProps> = ({
  duration,
  onSelect,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<Timeslot>();
  const shop = useShop();
  const day = useMemo(() => new Date(), []);
  const data = useFetch(
    `/shop/${shop["@id"]}/slots?day=${day
      .toISOString()
      .slice(0, 10)}&duration=${duration}`
  );
  const availableSlots = data?.length || 0;
  const hasSlots = availableSlots > 0;
  const noSlots = !hasSlots;
  return (
    <div className={styles.root}>
      {hasSlots && (
        <>
          <h3>Wähle deine Zeit aus</h3>
          <div className={styles.daySelect}>
            <h4>Heute ({day.getDate()})</h4>
            {data
              .filter((slot: Timeslot) => slot.from.getDate() === day.getDate())
              .map((slot: Timeslot) => (
                <Button
                  key={slot.id}
                  onClick={() => {
                    setSelectedSlot(slot);
                    onSelect(slot);
                  }}
                  variant={
                    selectedSlot && selectedSlot === slot
                      ? "primary"
                      : "unselected"
                  }
                >
                  {slot.from.getHours()}:{slot.from.getMinutes()}
                </Button>
              ))}
            <h4>Morgen ({day.getDate() + 1})</h4>
            {data
              .filter(
                (slot: Timeslot) => slot.from.getDate() === day.getDate() + 1
              )
              .map((slot: Timeslot) => (
                <Button
                  key={slot.id}
                  onClick={() => {
                    setSelectedSlot(slot);
                    onSelect(slot);
                  }}
                  variant={
                    selectedSlot && selectedSlot === slot
                      ? "primary"
                      : "unselected"
                  }
                >
                  {slot.from.getHours()}:{slot.from.getMinutes()}
                </Button>
              ))}
          </div>
        </>
      )}
      {noSlots && <h3>Es wurden keine freie Zeitslots gefunden</h3>}
    </div>
  );
};

export default AvailableTimeslots;
