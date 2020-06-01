import React, { useCallback } from "react";

import Button from "../button/button";

import styles from "./share-shop.module.css";
import Spacer from "../spacer/spacer";
import { useShop } from "../../service/server/connection";

interface ShareShopProps {
  backToIndex: () => void;
}

const ShareShop: React.FC<ShareShopProps> = ({ backToIndex }) => {
  const shop = useShop();
  const copyLink = useCallback(async () => {
    await navigator.clipboard.writeText(shop["@id"]);
  }, [shop]);
  return (
    <div className={styles.root}>
      <h2>Erzähle es deinen Kunden!</h2>
      <Spacer />
      <p>
        Dein Geschäft wurde erfolgreich bei Platzhalter.io registriert. Du
        kannst direkt starten. Am Besten weist du deine Kunden gleich auf das
        neue Angebot hin und verhinderst so lange Schlangen vor dem Geschäft.
      </p>
      <Spacer />
      <h3>Deine individuelle Shop-Adresse:</h3>
      <p className={styles.copyShop}>{shop["@id"]}</p>
      <Spacer />
      <Button className={styles.button} onClick={copyLink} variant="primary">
        In die Zwischenablage kopieren
      </Button>
      <Spacer />
      <Button
        className={styles.button}
        onClick={backToIndex}
        variant="secondary"
      >
        Zurück zur Auswahl
      </Button>
      <Spacer />
    </div>
  );
};

export default ShareShop;
