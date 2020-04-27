import React from "react";

import useSWR from "swr";
import Button from "../button/button";

import styles from "./book-timeslot.module.css";
import { fetcher } from "../../service/fetcher/fetcher";

interface BookTimeslotProps {
  day: Date;
  duration: number;
}

function useShop() {
  return {
    "@id": "1",
    address: "Bahnhofstr. 1, 94032 Passau",
    name: "Fitnessstudio zum goldenen Bizeps",
  };
}

const BookTimeslot: React.FC<BookTimeslotProps> = ({ day, duration }) => {
  const shop = useShop();
  const { data } = useSWR(
    `/shop/${shop["@id"]}/slots?day=${day}&duration=${duration}`,
    fetcher,
    {
      suspense: true,
    }
  );
  const availableSlots = data?.length || 0;
  const hasSlots = availableSlots > 0;
  const noSlots = !hasSlots;
  return (
    <div className={styles.root}>
      {hasSlots && <h3>{availableSlots} freie Zeitslots gefunden</h3>}
      {noSlots && <h3>Es wurden keine freie Zeitslots gefunden</h3>}
      <div className={styles.daySelect}>
        <Button onClick={() => {}}>Wähle deinen Zeitraum aus</Button>
      </div>
    </div>
  );
};

export default BookTimeslot;
