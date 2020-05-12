import React, { useCallback } from "react";

import Button from "../button/button";
import { ReactComponent as ShareIcon } from "../../asset/image/share-icon.svg";

import styles from "./share-shop.module.css";
import Spacer from "../spacer/spacer";
import useShop from "../../service/use-shop";

interface ShareShopProps {}

const ShareShop: React.FC<ShareShopProps> = () => {
  const shop = useShop();
  const shareOnFacebook = useCallback(() => {
    console.log("share fb...");
  }, []);
  const shareOnLinkedIn = useCallback(() => {
    console.log("share linkedin...");
  }, []);
  return (
    <div className={styles.root}>
      <h2>Erzähle es deinen Kunden!</h2>
      <Spacer />
      <Button onClick={shareOnFacebook}>
        <ShareIcon /> Auf Facebook teilen
      </Button>
      <Spacer />
      <Button onClick={shareOnLinkedIn}>
        <ShareIcon /> Auf LinkedIn teilen
      </Button>
      <Spacer />
      <h3>...oder direkt auf der Webseite einbinden:</h3>
      <Spacer />
      <Button>&lt;iframe ...{shop.name}&gt;&lt;/iframe&gt;</Button>
    </div>
  );
};

export default ShareShop;
