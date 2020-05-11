import React, { useState, useCallback, Suspense } from "react";

import Button from "../button/button";
import Slider from "../slider/slider";
import AvailableTimeslots from "../available-timeslots/available-timeslots";

import styles from "./choose-day.module.css";
import Loader from "../loader/loader";
import Spacer from "../spacer/spacer";

interface ChooseDayProps {
  chooseSlot: (props: { day: Date; duration: number }) => void;
}

const ChooseDay: React.FC<ChooseDayProps> = ({ chooseSlot }) => {
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
      <Spacer />
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
      <Spacer />
      <Suspense fallback={<Loader />}>
        <AvailableTimeslots
          duration={duration}
          day={day}
          navigateToSlotSelection={() => chooseSlot({ day, duration })}
        />
      </Suspense>
    </div>
  );
};

export default ChooseDay;
