import React, { useCallback, useState } from "react";

import { ReactComponent as BookmarkIcon } from "../../asset/image/bookmark-icon.svg";
import { ReactComponent as EditIcon } from "../../asset/image/edit-icon.svg";

import { LocalTicket } from "../../service/domain";
import styles from "./show-ticket.module.css";
import Button from "../button/button";
import Spacer from "../spacer/spacer";
import { useHistory } from "react-router-dom";
import contactToString from "../../lib/contact-to-string/contact-to-string";
import { usePush } from "../../service/server/connection";
import useLocalTickets from "../../service/tickets/use-local-tickets";
import NotFoundError from "../../service/error/not-found-error";
import HttpRequestError from "../../service/error/http-request-error";

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
  const [, setError] = useState(null);
  const api = usePush();
  const { saveTickets, tickets } = useLocalTickets();
  const copyLink = useCallback(async () => {
    await navigator.clipboard.writeText(ticket.ticketUrl);
  }, [ticket.ticketUrl]);
  const removeTicket = useCallback(async () => {
    try {
      const yes = window.confirm("Möchtest Du das Ticket wirklich stornieren?");
      if (yes) {
        await api.removeTicket({ ticketUrl: ticket.ticketUrl });
        const { [ticket.id]: _toRemove, ...newTickets } = tickets;
        saveTickets(newTickets);
        push(`/show-tickets`);
      }
    } catch (e) {
      if (e instanceof NotFoundError) {
        const { [ticket.id]: _toRemove, ...newTickets } = tickets;
        saveTickets(newTickets);
        push(`/show-tickets`);
      } else {
        setError(() => {
          throw e;
        });
      }
    }
  }, [api, push, saveTickets, ticket.id, ticket.ticketUrl, tickets]);
  return (
    <div className={styles.root}>
      <div className={styles.screen}>
        <h2>{label}</h2>
        <p>
          Komm zur angegebenen Zeit ({ticket.start.toLocaleString()}) ins
          Geschäft ({ticket.shop.name}
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
          onClick={removeTicket}
        >
          <EditIcon />
          <span>Ticket stornieren</span>
        </Button>

        <Spacer />

        <Button
          className={styles.button}
          variant="secondary"
          onClick={backToIndex}
        >
          <span>Zurück zum Anfang</span>
        </Button>

        <Spacer />
      </div>
    </div>
  );
};

export default ShowTicket;
