import React, { useState, useCallback } from "react";

import styles from "./book-timeslot.module.css";
import { Customer, Timeslot } from "../../service/domain";
import { useFetch, useShop } from "../../service/server/connection";
import ChooseSlot from "../choose-slot/choose-slot";
import RegisterCustomer from "../register-customer/register-customer";

interface BookTimeslotProps {
  bookTicketForSlot: (props: {
    customer?: Customer;
    timeslot: Timeslot;
  }) => void;
  day: Date;
  duration: number;
}

const BookTimeslot: React.FC<BookTimeslotProps> = ({
  bookTicketForSlot,
  day,
  duration,
}) => {
  const shop = useShop();
  const data = useFetch(
    `/shop/${shop["@id"]}/slots?day=${day}&duration=${duration}`
  );
  const [timeslot, setTimeslot] = useState<Timeslot>();
  const onSelect = useCallback(
    (id) => {
      const selectedTimeslot = (data as Timeslot[]).find(
        (slot) => slot.id === id
      )!;
      if (shop.needsRegistration) {
        setTimeslot(selectedTimeslot);
      } else {
        bookTicketForSlot({ timeslot: selectedTimeslot });
      }
    },
    [bookTicketForSlot, data, setTimeslot, shop.needsRegistration]
  );
  return (
    <div className={styles.root}>
      {!timeslot && data && (
        <ChooseSlot
          needsRegistration={shop.needsRegistration}
          onSelect={onSelect}
          slots={data}
        />
      )}
      {shop.needsRegistration && timeslot && (
        <RegisterCustomer
          onRegister={(customer) => {
            bookTicketForSlot({ customer, timeslot });
          }}
        />
      )}
    </div>
  );
};

export default BookTimeslot;
