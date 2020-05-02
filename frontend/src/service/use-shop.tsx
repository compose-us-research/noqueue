import React from "react";
import { ReactComponent as BookIcon } from "../asset/image/book-icon.svg";

const shop = {
  address: "Am Bahnhofsplatz, 94032 Passau",
  icon: <BookIcon />,
  name: "Buchhandlung Pustet",
  needsRegistration: true,
};

const useShop = () => {
  return shop;
};

export default useShop;
