import React, { useState, useCallback, Suspense } from "react";

import { ReactComponent as BookIcon } from "../../asset/image/book-icon.svg";
import Button from "../button/button";
import Slider from "../slider/slider";
import Header from "../header/header";
import BookTimeslot from "../book-timeslot/book-timeslot";
import StoreItem from "../store-item/store-item";

import styles from "./choose-day.module.css";
import Loader from "../loader/loader";

interface ChooseDayProps {
  children?: React.ReactNode;
}

const ChooseDay: React.FC<ChooseDayProps> = ({ children }) => {
  const [today] = useState(new Date());
  const [tomorrow] = useState(new Date());
  const [day, setDay] = useState<Date>(today);
  const [duration, setDuration] = useState<number>(15);
  const chooseToday = useCallback(() => {
    setDay(today);
  }, [setDay, today]);
  const chooseTomorrow = useCallback(() => {
    setDay(tomorrow);
  }, [setDay, tomorrow]);

  return (
    <div className={styles.root}>
      <Header>
        <StoreItem
          address="Am Bahnhofsplatz, 94032 Passau"
          icon={<BookIcon />}
          name="Buchhandlung Pustet"
        />
      </Header>
      <div className={styles.day}>
        <h2>Wann möchtest Du einkaufen?</h2>
        <div className={styles.daySelect}>
          <Button
            onClick={chooseToday}
            variant={day === today ? "primary" : "secondary"}
          >
            Heute
          </Button>
          <Button
            onClick={chooseTomorrow}
            variant={day === tomorrow ? "primary" : "secondary"}
          >
            Morgen
          </Button>
        </div>
      </div>
      <div className={styles.duration}>
        <h2>Wie viel Zeit benötigst Du?</h2>
        <Slider
          onChange={(value) => {
            if (value) {
              setDuration(value as number);
            }
          }}
        />
      </div>
      <Suspense fallback={<Loader />}>
        <BookTimeslot duration={duration} day={day} />
      </Suspense>
    </div>
  );
};

export default ChooseDay;
