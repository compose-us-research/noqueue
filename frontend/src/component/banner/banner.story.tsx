import React from "react";
import Banner from "./banner";

export default {
  title: "Banner",
  component: Banner,
};

export const BetaBanner = () => (
  <Banner>
    Achtung: Demo - aktuell wird Deine Buchung in den Geschäften noch nicht
    genutzt!
  </Banner>
);
