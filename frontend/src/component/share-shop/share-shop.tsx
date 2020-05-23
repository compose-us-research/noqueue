import React, { useCallback } from "react";

import Button from "../button/button";
import { ReactComponent as ShareIcon } from "../../asset/image/share-icon.svg";

import styles from "./share-shop.module.css";
import Spacer from "../spacer/spacer";
import { useShop } from "../../service/server/connection";

interface ShareShopProps {
  backToIndex: () => void;
}

const ShareShop: React.FC<ShareShopProps> = ({ backToIndex }) => {
  const shop = useShop();
  const shareOnFacebook = useCallback(() => {
    console.log("share fb...");
  }, []);
  const shareOnLinkedIn = useCallback(() => {
    console.log("share linkedin...");
  }, []);
  const shareIframeText = `<iframe ...${shop.name}></iframe>`;
  return (
    <div className={styles.root}>
      <h2>Erzähle es deinen Kunden!</h2>
      <Spacer />
      <Button
        className={styles.button}
        onClick={shareOnFacebook}
        variant="secondary"
      >
        <span className={styles.icon}>
          <ShareIcon />
        </span>
        <Spacer direction="column" />
        Auf Facebook teilen
      </Button>
      <Spacer />
      <Button
        className={styles.button}
        onClick={shareOnLinkedIn}
        variant="secondary"
      >
        <span className={styles.icon}>
          <ShareIcon />
        </span>
        <Spacer direction="column" />
        Auf LinkedIn teilen
      </Button>
      <Spacer />
      <h3>...oder direkt auf der Webseite einbinden:</h3>
      <Spacer />
      <textarea
        className={styles.iframeText}
        cols={100}
        rows={10}
        contentEditable={false}
        disabled
        value={shareIframeText}
      />

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
