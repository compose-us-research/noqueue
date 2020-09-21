import React from "react";

import Button from "../button/button";

import styles from "./available-tickets.module.css";
import { useShopFetch } from "../../service/server/connection";
import { Ticket, AvailableSlot } from "../../service/domain";
import generateSlotsFromData from "../../lib/generate-slots-from-data/generate-slots-from-data";
import slotsPerDays from "../../lib/slots-per-days/slots-per-days";
import tdf from "../../lib/two-digit-format/two-digit-format";

interface AvailableTicketsProps {
  duration: number;
  end: Date;
  onSelect: (slot: AvailableSlot) => void;
  selectedSlot?: AvailableSlot;
  start: Date;
  usesDays: boolean;
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
  usesDays,
}) => {
  const url = `/ticket/available?start=${encodeURIComponent(
    start.toISOString()
  )}&end=${encodeURIComponent(end.toISOString())}`;
  const data = useShopFetch<Ticket[]>(url, { mapper });
  const defaultMinutes = usesDays ? 24 * 60 : 15;
  const durationInMinutes = usesDays ? duration * 24 * 60 : duration;
  const from = new Date(
    Math.floor(Date.now() / (defaultMinutes * 60 * 1000)) *
      defaultMinutes *
      60 *
      1000
  );
  const spontaneousSlots = generateSlotsFromData({
    slots: data,
    duration: durationInMinutes + defaultMinutes,
    from,
    usesDays,
  });
  const generatedSlots = generateSlotsFromData({
    slots: data,
    duration: durationInMinutes,
    from: new Date(+from + defaultMinutes * 60 * 1000),
    usesDays,
  });
  const firstIsNow =
    spontaneousSlots.length > 0 && +spontaneousSlots[0].start === +from;
  const hasSlots = generatedSlots.length > 0;
  const slotRightNow = spontaneousSlots[0];
  const noSlots = !hasSlots;
  const dailySlots = slotsPerDays(generatedSlots);
  return (
    <div className={styles.root}>
      {hasSlots && (
        <>
          <h3>Wähle deine Zeit aus</h3>
          {firstIsNow && (
            <div className={styles.bookNow}>
              <Button
                className={styles.button}
                onClick={() => onSelect(slotRightNow)}
                variant={
                  selectedSlot &&
                  +selectedSlot.start === +slotRightNow.start &&
                  +selectedSlot.end === +slotRightNow.end
                    ? "primary"
                    : "secondary"
                }
              >
                <span className={styles.big}>Spontan</span>
                <span className={styles.mini}>
                  (bis {tdf(slotRightNow.end.getHours())}:
                  {tdf(slotRightNow.end.getMinutes())})
                </span>
              </Button>
            </div>
          )}
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
                      <span className={styles.big}>
                        {tdf(slot.start.getHours())}:
                        {tdf(slot.start.getMinutes())}
                      </span>
                      <span className={styles.mini}>
                        (bis {tdf(slot.end.getHours())}:
                        {tdf(slot.end.getMinutes())})
                      </span>
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
