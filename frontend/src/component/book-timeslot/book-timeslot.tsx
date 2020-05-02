import React from "react";

import useSWR from "swr";

import styles from "./book-timeslot.module.css";
import { fetcher, Timeslot } from "../../service/fetcher/fetcher";
import ChooseSlot from "../choose-slot/choose-slot";

interface BookTimeslotProps {
  bookTicket: (props: { timeslot: Timeslot }) => void;
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

const BookTimeslot: React.FC<BookTimeslotProps> = ({
  bookTicket,
  day,
  duration,
}) => {
  const shop = useShop();
  const { data } = useSWR(
    `/shop/${shop["@id"]}/slots?day=${day}&duration=${duration}`,
    fetcher,
    {
      suspense: true,
    }
  );
  return (
    <div className={styles.root}>
      {data && (
        <ChooseSlot
          slots={data}
          onSelect={(id) => bookTicket({ timeslot: data[id] })}
        />
      )}
    </div>
  );
};

export default BookTimeslot;
