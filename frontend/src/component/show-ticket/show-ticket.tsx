import React, { useCallback } from "react";

import { ReactComponent as BookmarkIcon } from "../../asset/image/bookmark-icon.svg";
import { ReactComponent as EditIcon } from "../../asset/image/edit-icon.svg";

import { RegisteredTicket } from "../../service/domain";
import styles from "./show-ticket.module.css";
import Button from "../button/button";
import Spacer from "../spacer/spacer";
import { useHistory, useRouteMatch } from "react-router-dom";
import contactToString from "../../lib/contact-to-string/contact-to-string";

interface ShowTicketProps {
  backToIndex: () => void;
  label?: string;
  ticket: RegisteredTicket;
}

const ShowTicket: React.FC<ShowTicketProps> = ({
  backToIndex,
  label = "Erledigt! Dein Ticket ist jetzt verfügbar.",
  ticket,
}) => {
  const { push } = useHistory();
  const { path } = useRouteMatch();
  const copyLink = useCallback(async () => {
    await navigator.clipboard.writeText(ticket.ticketUrl);
  }, [path]);
  const navigateToUpdate = useCallback(() => {
    push(`${path}/update`);
  }, [push, path]);
  return (
    <div className={styles.root}>
      <h2>{label}</h2>
      <p>
        Komm zur angegebenen Zeit ({ticket.start.toLocaleTimeString()}) ins
        Geschäft ({ticket.shop.name}), scanne deinen QR-Code und geh entspannt
        einkaufen - ohne in der Schlange zu warten. Als Kontakt ist hinterlegt:{" "}
        {contactToString(ticket.contact)}
      </p>
      <div>
        <img
          alt={`Ticket QR code with embedded url ${ticket.ticketUrl}`}
          crossOrigin="anonymous"
          src={ticket.ticketUrl}
        />
      </div>

      <Spacer />

      <Button className={styles.button} variant="secondary" onClick={copyLink}>
        <BookmarkIcon />
        <span>Als Lesezeichen speichern</span>
      </Button>

      <Spacer />

      <Button
        className={styles.button}
        variant="secondary"
        onClick={navigateToUpdate}
      >
        <EditIcon />
        <span>Ticket bearbeiten / stornieren</span>
      </Button>

      <Spacer />

      <Button
        className={styles.button}
        variant="secondary"
        onClick={backToIndex}
      >
        <span>Zurück zum Anfang</span>
      </Button>
    </div>
  );
};

export default ShowTicket;
