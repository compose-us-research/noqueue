import React, { useState } from "react";

import { Ticket } from "../../service/domain";
import ChooseDuration from "../choose-duration/choose-duration";
import Spacer from "../spacer/spacer";
import AvailableTickets from "../available-tickets/available-tickets";
import styles from "./choose-ticket.module.css";
import Button from "../button/button";
import { useShop } from "../../service/server/connection";

interface ChooseTicketProps {
  onSelect: (ticket: Ticket) => void;
}

const ChooseTicket: React.FC<ChooseTicketProps> = ({ onSelect }) => {
  const shop = useShop();
  const [duration, setDuration] = useState<number>(15);
  const [selectedTicket, setSelectedTicket] = useState<Ticket>();
  return (
    <div className={styles.root}>
      <ChooseDuration defaultValue={duration} onChange={setDuration} />
      <Spacer />
      <AvailableTickets duration={duration} onSelect={setSelectedTicket} />
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
  );
};

export default ChooseTicket;
