import React from "react";

import Button from "../button/button";
import Headline from "../headline/headline";

import styles from "./choose-role.module.css";

interface ChooseRoleProps {
  selectShopRole: () => void;
  selectCustomerRole: () => void;
}

const ChooseRole: React.FC<ChooseRoleProps> = ({
  selectShopRole,
  selectCustomerRole,
}) => {
  return (
    <div className={styles.root}>
      <Headline>
        <h2>Willkommen bei Platzhalter.io!</h2>
      </Headline>
      <div className={styles.text}>
        Mit Platzhalter.io wollen wir in Zeiten von Covid19 Menschenansammlungen
        vor und in Geschäften vermeiden. Für Geschäfte und Ihre Kunden ist die
        Nutzung kostenlos.
      </div>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={selectShopRole}>
          Als Geschäft registrieren
        </Button>
        <Button variant="secondary" onClick={selectCustomerRole}>
          Als Kunde einen Termin buchen
        </Button>
      </div>
    </div>
  );
};

export default ChooseRole;