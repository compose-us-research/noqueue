import React, { useMemo, useState } from "react";

import Button from "../button/button";

import styles from "./available-tickets.module.css";
import { useFetch, useShop } from "../../service/server/connection";
import { Ticket } from "../../service/domain";

interface AvailableTicketsProps {
  duration: number;
  onSelect: (slot: Ticket) => void;
}

const AvailableTickets: React.FC<AvailableTicketsProps> = ({
  duration,
  onSelect,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<Ticket>();
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
              .filter((slot: Ticket) => slot.start.getDate() === day.getDate())
              .map((slot: Ticket) => (
                <Button
                  key={slot.start.toISOString()}
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
                  {slot.start.getHours()}:{slot.start.getMinutes()}
                </Button>
              ))}
            <h4>Morgen ({day.getDate() + 1})</h4>
            {data
              .filter(
                (slot: Ticket) => slot.start.getDate() === day.getDate() + 1
              )
              .map((slot: Ticket) => (
                <Button
                  key={slot.start.toISOString()}
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
                  {slot.start.getHours()}:{slot.start.getMinutes()}
                </Button>
              ))}
          </div>
        </>
      )}
      {noSlots && <h3>Es wurden keine freie Zeitslots gefunden</h3>}
    </div>
  );
};

export default AvailableTickets;
