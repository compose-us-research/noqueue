import React, { useCallback } from "react";

import { ReactComponent as BookmarkIcon } from "../../asset/image/bookmark-icon.svg";
import { ReactComponent as EditIcon } from "../../asset/image/edit-icon.svg";

import { LocalTicket } from "../../service/domain";
import styles from "./show-ticket.module.css";
import Button from "../button/button";
import Spacer from "../spacer/spacer";
import { useHistory, useRouteMatch } from "react-router-dom";
import contactToString from "../../lib/contact-to-string/contact-to-string";

interface ShowTicketProps {
  backToIndex: () => void;
  label?: string;
  ticket: LocalTicket;
}

const ShowTicket: React.FC<ShowTicketProps> = ({
  backToIndex,
  label = "Erledigt! Dein Ticket ist jetzt verfügbar.",
  ticket,
}) => {
  const { push } = useHistory();
  const { url } = useRouteMatch();
  const copyLink = useCallback(async () => {
    await navigator.clipboard.writeText(ticket.ticketUrl);
  }, [ticket.ticketUrl]);
  const navigateToUpdate = useCallback(() => {
    push(`${url}/update`);
  }, [push, url]);
  return (
    <div className={styles.root}>
      <div className={styles.screen}>
        <h2>{label}</h2>
        <p>
          Komm zur angegebenen Zeit ({ticket.start.toLocaleTimeString()} am{" "}
          {ticket.start.toLocaleDateString()}) ins Geschäft ({ticket.shop.name}
          ), scanne deinen QR-Code und geh entspannt einkaufen - ohne in der
          Schlange zu warten.{" "}
          {ticket.contact &&
            `Als Kontakt ist hinterlegt: ${contactToString(ticket.contact)}`}
        </p>
        <div>
          <img
            alt={`Ticket QR code with embedded url ${ticket.ticketUrl}`}
            crossOrigin="anonymous"
            src={ticket.ticketUrl}
          />
        </div>

        <Spacer />

        <Button
          className={styles.button}
          variant="secondary"
          onClick={copyLink}
        >
          <BookmarkIcon />
          <span>Ticket kopieren / weitergeben</span>
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
    </div>
  );
};

export default ShowTicket;
