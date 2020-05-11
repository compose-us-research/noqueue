import React, { useState, useEffect, useCallback } from "react";

import { Customer, Timeslot } from "../../service/domain";
import CurrentShop from "../current-shop/current-shop";
import ChooseDay from "../choose-day/choose-day";
import BookTimeslot from "../book-timeslot/book-timeslot";
import ShowTimeslot from "../show-timeslot/show-timeslot";
import Spacer from "../spacer/spacer";
import styles from "./customer-app.module.css";

interface CustomerAppProps {
  backToIndex: () => void;
}

const CustomerApp: React.FC<CustomerAppProps> = () => {
  const [currentScreen, setCurrentScreen] = useState<JSX.Element>();

  const showTimeslot: (props: {
    customer?: Customer;
    timeslot: Timeslot;
  }) => void = useCallback(
    ({ customer, timeslot }) =>
      setCurrentScreen(
        <ShowTimeslot customer={customer} timeslot={timeslot} />
      ),
    [setCurrentScreen]
  );

  const showChooseSlot: (props: {
    day: Date;
    duration: number;
  }) => void = useCallback(
    ({ day, duration }) => {
      setCurrentScreen(
        <BookTimeslot
          day={day}
          duration={duration}
          bookTicketForSlot={showTimeslot}
        />
      );
    },
    [setCurrentScreen, showTimeslot]
  );

  useEffect(() => setCurrentScreen(<ChooseDay chooseSlot={showChooseSlot} />), [
    setCurrentScreen,
    showChooseSlot,
  ]);

  return (
    <div className={styles.root}>
      <CurrentShop />
      <Spacer />
      <div className={styles.screen}>{currentScreen}</div>
      <Spacer />
    </div>
  );
};

export default CustomerApp;
