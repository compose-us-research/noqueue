import React, { useState, useMemo, Suspense } from "react";

import { AvailableSlot } from "../../service/domain";
import ChooseDuration from "../choose-duration/choose-duration";
import Spacer from "../spacer/spacer";
import AvailableTickets from "../available-tickets/available-tickets";
import styles from "./choose-ticket.module.css";
import Button from "../button/button";
import { useShop } from "../../service/server/connection";
import Loader from "../loader/loader";

interface ChooseTicketProps {
  onSelect: (ticket: AvailableSlot) => void;
}

const ChooseTicket: React.FC<ChooseTicketProps> = ({ onSelect }) => {
  const shop = useShop();
  const [duration, setDuration] = useState<number>(15);
  const [selectedTicket, setSelectedTicket] = useState<AvailableSlot>();
  // use start / end from url
  const start = useMemo(() => {
    // The latest 5 minutes
    const now = Math.floor(Date.now() / (5 * 60 * 1000)) * (5 * 60 * 1000);
    return new Date(now);
  }, []);
  const end = useMemo(() => new Date(+start + 4 * 24 * 60 * 60 * 1000), [
    start,
  ]);

  return (
    <div className={styles.root}>
      <ChooseDuration onChange={setDuration} />
      <Spacer />
      <Suspense fallback={<Loader />}>
        <AvailableTickets
          duration={duration}
          end={end}
          onSelect={setSelectedTicket}
          selectedSlot={selectedTicket}
          start={start}
        />
      </Suspense>
      <div className={styles.bottomSubmit}>
        <p>
          Achtung: Du kannst deinen Zeitraum natürlich nachträglich verändern /
          stornieren, wenn dir etwas dazwischen kommen sollte.
        </p>
        <Spacer />
        <Button
          disabled={selectedTicket === null}
          onClick={() => {
            if (selectedTicket) {
              onSelect(selectedTicket);
            }
          }}
        >
          Zeitraum {!shop.needsRegistration && "verbindlich"} buchen
        </Button>
        <Spacer />
      </div>
    </div>
  );
};

export default ChooseTicket;
