import React from "react";

import Button from "../button/button";
import Headline from "../headline/headline";

import styles from "./choose-role.module.css";
import Spacer from "../spacer/spacer";

interface ChooseRoleProps {
  hasTickets: boolean;
  selectShopRole: () => void;
  selectCustomerRole: () => void;
  selectShowTickets: () => void;
}

const ChooseRole: React.FC<ChooseRoleProps> = ({
  selectShopRole,
  selectCustomerRole,
  hasTickets,
  selectShowTickets,
}) => {
  return (
    <div className={styles.root}>
      <Headline>
        <h2>Willkommen bei Platzhalter.io!</h2>
      </Headline>
      <Spacer />
      <p className={styles.text}>
        Mit Platzhalter.io wollen wir in Zeiten von Covid19 Menschenansammlungen
        vor und in Geschäften vermeiden. Für Geschäfte und Ihre Kunden ist die
        Nutzung kostenlos.
      </p>
      <Spacer />
      <div className={styles.actions}>
        <Button variant="secondary" onClick={selectShopRole}>
          Als Geschäft registrieren
        </Button>
        <Spacer />
        <Button variant="secondary" onClick={selectCustomerRole}>
          Als Kunde einen Termin buchen
        </Button>
        <Spacer />
        <Button
          variant="secondary"
          onClick={selectShowTickets}
          disabled={!hasTickets}
        >
          Gespeicherte Termine ansehen
        </Button>
      </div>
    </div>
  );
};

export default ChooseRole;
