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
  const start = useMemo(() => new Date(Date.now()), []);
  const end = useMemo(() => new Date(+start + 2 * 24 * 60 * 60 * 1000), [
    start,
  ]);

  return (
    <div className={styles.root}>
      <ChooseDuration defaultValue={duration} onChange={setDuration} />
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
        <p className={styles.info}>
          Achtung: Du kannst deinen Zeitraum natürlich nachträglich verändern /
          stornieren, wenn dir etwas dazwischen kommen sollte.
        </p>
        <Spacer />
        <div className={styles.action}>
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
        </div>
      </div>
    </div>
  );
};

export default ChooseTicket;
