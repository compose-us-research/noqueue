import React, { useState } from "react";

import CurrentShop from "../current-shop/current-shop";
import styles from "./customer-app.module.css";
import ChooseDay from "../choose-day/choose-day";
import BookTimeslot from "../book-timeslot/book-timeslot";
import ShowTimeslot from "../show-timeslot/show-timeslot";
import Spacer from "../spacer/spacer";

interface CustomerAppProps {
  backToIndex: () => void;
}

const CustomerApp: React.FC<CustomerAppProps> = () => {
  const [currentScreen, setCurrentScreen] = useState<JSX.Element>(
    <ChooseDay
      chooseSlot={({ day, duration }) => {
        setCurrentScreen(
          <BookTimeslot
            day={day}
            duration={duration}
            bookTicket={({ timeslot }) => {
              setCurrentScreen(<ShowTimeslot timeslot={timeslot} />);
            }}
          />
        );
      }}
    />
  );
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
