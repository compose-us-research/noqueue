import React, { useState, useCallback } from "react";

import Button from "../button/button";

import styles from "./choose-slot.module.css";
import { Timeslot } from "../../service/fetcher/fetcher";
import Spacer from "../spacer/spacer";

interface ChooseSlotProps {
  slots: Timeslot[];
  onSelect: (id: number) => void;
}

const ChooseSlot: React.FC<ChooseSlotProps> = ({ onSelect, slots }) => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const chooseSlot = useCallback(
    (id) => {
      return () => setSelectedSlot(id);
    },
    [setSelectedSlot]
  );
  return (
    <div className={styles.root}>
      <h2>Wähle deinen gewünschten Zeitraum</h2>
      <Spacer />
      <div className={styles.buttons}>
        {slots.map((slot) => (
          <Button
            key={slot.id}
            onClick={chooseSlot(slot.id)}
            variant={
              selectedSlot && selectedSlot === slot.id
                ? "primary"
                : "unselected"
            }
          >
            {slot.from.getHours()}:{slot.from.getMinutes()}
          </Button>
        ))}
      </div>
      <Spacer />
      <p className={styles.info}>
        Achtung: Du kannst deinen Zeitraum natürlich nachträglich verändern /
        stornieren, wenn dir etwas dazwischen kommen sollte.
      </p>
      <Spacer />
      <div className={styles.action}>
        <Button
          disabled={selectedSlot === null}
          onClick={() => {
            if (selectedSlot !== null) {
              onSelect(selectedSlot!);
            }
          }}
        >
          Zeitraum verbindlich buchen
        </Button>
      </div>
    </div>
  );
};

export default ChooseSlot;
