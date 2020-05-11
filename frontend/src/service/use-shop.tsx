import React from "react";
import { ReactComponent as BookIcon } from "../asset/image/book-icon.svg";
import { RegisteredShop } from "./domain";

const shop: RegisteredShop = {
  address: "Am Bahnhofsplatz, 94032 Passau",
  "@id": "123",
  icon: <BookIcon />,
  name: "Buchhandlung Pustet",
  needsRegistration: true,
  ranges: [],
};

const useShop = () => {
  return shop;
};

export default useShop;
