import React, { useState } from "react";

import Button from "../button/button";

import styles from "./available-tickets.module.css";
import { useShopFetch } from "../../service/server/connection";
import { Ticket, AvailableSlot } from "../../service/domain";
import generateSlotsFromData from "../../lib/generate-slots-from-data/generate-slots-from-data";
import slotsPerDays from "../../lib/slots-per-days/slots-per-days";

interface AvailableTicketsProps {
  duration: number;
  end: Date;
  onSelect: (slot: AvailableSlot) => void;
  start: Date;
}

const mapper: (from: any) => Ticket[] = (tickets) => {
  return tickets.map((ticket: any) => ({
    allowed: ticket.allowed,
    available: ticket.available,
    end: new Date(ticket.end),
    reserved: ticket.reserved,
    start: new Date(ticket.start),
  }));
};

const AvailableTickets: React.FC<AvailableTicketsProps> = ({
  duration,
  end,
  onSelect,
  start,
}) => {
  const url = `/ticket/available?start=${start.toISOString()}&end=${end.toISOString()}`;
  const data = useShopFetch<Ticket[]>(url, mapper);
  const slots = generateSlotsFromData(data, duration);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot>();
  const hasSlots = slots.length > 0;
  const noSlots = !hasSlots;
  const dailySlots = slotsPerDays(slots);
  return (
    <div className={styles.root}>
      {hasSlots && (
        <>
          <h3>Wähle deine Zeit aus</h3>
          <div className={styles.daySelect}>
            {Object.entries(dailySlots).map(([day, slots]) => (
              <>
                <h4 key={day}>{day}</h4>
                <div className={styles.daySelect}>
                  {slots.map((slot) => (
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
            ))}
          </div>
        </>
      )}
      {noSlots && <h3>Es wurden keine freie Zeitslots gefunden</h3>}
    </div>
  );
};

export default AvailableTickets;
