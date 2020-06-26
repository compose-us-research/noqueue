import React from "react";

import Button from "../button/button";

import styles from "./available-tickets.module.css";
import { useShopFetch } from "../../service/server/connection";
import { Ticket, AvailableSlot } from "../../service/domain";
import generateSlotsFromData from "../../lib/generate-slots-from-data/generate-slots-from-data";
import slotsPerDays from "../../lib/slots-per-days/slots-per-days";
import tdf from "../../lib/two-digit-format/two-digit-format";
import findFirstSlots from "../../lib/find-first-slots/find-first-slot";

interface AvailableTicketsProps {
  duration: number;
  end: Date;
  onSelect: (slot: AvailableSlot) => void;
  selectedSlot?: AvailableSlot;
  start: Date;
}

const mapper: (from: any) => Ticket[] = (tickets) => {
  return tickets.member.map((ticket: any) => ({
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
  selectedSlot,
  start,
}) => {
  const url = `/ticket/available?start=${encodeURIComponent(
    start.toISOString()
  )}&end=${encodeURIComponent(end.toISOString())}`;
  const data = useShopFetch<Ticket[]>(url, { mapper });
  const from = new Date(
    Math.floor(Date.now() / (15 * 60 * 1000)) * 15 * 60 * 1000
  );
  const generatedSlots = generateSlotsFromData({
    slots: data,
    duration,
    from,
  });
  const hasSlots = generatedSlots.length > 0;
  const noSlots = !hasSlots;
  const [first, ...otherSlots] = hasSlots
    ? generatedSlots
    : (([null] as unknown) as AvailableSlot[]);
  const firstIsNow = first.start === from;
  const dailySlots = slotsPerDays(firstIsNow ? otherSlots : generatedSlots);
  return (
    <div className={styles.root}>
      {firstIsNow && (
        <Button
          onClick={() => onSelect(first)}
          variant={
            selectedSlot &&
            +selectedSlot.start === +first.start &&
            +selectedSlot.end === +first.end
              ? "primary"
              : "secondary"
          }
        >
          {tdf(first.start.getHours())}:{tdf(first.start.getMinutes())}
        </Button>
      )}
      {hasSlots && (
        <>
          <h3>Wähle deine Zeit aus</h3>
          <div className={styles.day}>
            {Object.entries(dailySlots).map(([day, slots]) => (
              <React.Fragment key={day}>
                <h4>{day}</h4>
                <div className={styles.selectInDay}>
                  {slots.map((slot) => (
                    <Button
                      key={`${slot.start.toISOString()}-${slot.end.toISOString()}-button`}
                      className={styles.button}
                      onClick={() => {
                        onSelect(slot);
                      }}
                      variant={
                        selectedSlot &&
                        +selectedSlot.start === +slot.start &&
                        +selectedSlot.end === +slot.end
                          ? "primary"
                          : "secondary"
                      }
                    >
                      {tdf(slot.start.getHours())}:
                      {tdf(slot.start.getMinutes())}
                    </Button>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
      {noSlots && <h3>Es wurden keine freie Zeitslots gefunden</h3>}
    </div>
  );
};

export default AvailableTickets;
