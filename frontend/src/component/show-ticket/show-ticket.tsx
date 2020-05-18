import React from "react";

import { ReactComponent as BookmarkIcon } from "../../asset/image/bookmark-icon.svg";
import { ReactComponent as EditIcon } from "../../asset/image/edit-icon.svg";

import { Customer, RegisteredTicket } from "../../service/domain";
import styles from "./show-ticket.module.css";
import Button from "../button/button";
import Spacer from "../spacer/spacer";

interface ShowTicketProps {
  customer?: Customer;
  ticket: RegisteredTicket;
}

const ShowTicket: React.FC<ShowTicketProps> = ({ customer, ticket }) => {
  return (
    <div className={styles.root}>
      <h2>Erledigt! Dein Ticket ist jetzt verfügbar.</h2>
      <p>
        Komm zur angegebenen Zeit ins Geschäft, scanne deinen QR-Code und geh
        entspannt einkaufen - ohne in der Schlange zu warten.
      </p>
      <div>stub: &lt;QrCode ticket={ticket.id} /&gt;</div>

      <Spacer />

      <Button className={styles.button} variant="secondary">
        <BookmarkIcon />
        <span>Als Lesezeichen speichern</span>
      </Button>

      <Spacer />

      <Button className={styles.button} variant="secondary">
        <EditIcon />
        <span>Ticket bearbeiten / stornieren</span>
      </Button>
    </div>
  );
};

export default ShowTicket;