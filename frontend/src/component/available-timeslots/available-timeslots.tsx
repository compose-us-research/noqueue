import React from "react";

import Button from "../button/button";

import styles from "./available-timeslots.module.css";
import { useFetch } from "../../service/server/connection";

interface AvailableTimeslotsProps {
  navigateToSlotSelection: () => void;
  day: Date;
  duration: number;
}

function useShop() {
  return {
    "@id": "1",
    address: "Bahnhofstr. 1, 94032 Passau",
    name: "Fitnessstudio zum goldenen Bizeps",
  };
}

const AvailableTimeslots: React.FC<AvailableTimeslotsProps> = ({
  navigateToSlotSelection,
  day,
  duration,
}) => {
  const shop = useShop();
  const data = useFetch(
    `/shop/${shop["@id"]}/slots?day=${day}&duration=${duration}`
  );
  const availableSlots = data?.length || 0;
  const hasSlots = availableSlots > 0;
  const noSlots = !hasSlots;
  return (
    <div className={styles.root}>
      {hasSlots && (
        <>
          <h3>{availableSlots} freie Zeitslots gefunden</h3>
          <div className={styles.daySelect}>
            <Button onClick={navigateToSlotSelection}>
              Wähle deinen Zeitraum aus
            </Button>
          </div>
        </>
      )}
      {noSlots && <h3>Es wurden keine freie Zeitslots gefunden</h3>}
    </div>
  );
};

export default AvailableTimeslots;
