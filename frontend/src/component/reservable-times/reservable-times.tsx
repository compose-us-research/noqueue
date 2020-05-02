import React, { useCallback } from "react";

import { ReactComponent as PlusIcon } from "../../asset/image/plus-icon.svg";
import { Timerange } from "../../service/domain";
import Button from "../button/button";
import styles from "./reservable-times.module.css";
import RangeSlider from "../multi-slider/range-slider";
import TextField from "../text-field/text-field";
import { FormContext, useForm } from "react-hook-form";
import DaySelector from "../day-selector/day-selector";
import Spacer from "../spacer/spacer";

interface ReservableTimesProps {
  ranges: Timerange[];
}

// const ReservableTimes: React.FC<ReservableTimesProps> = ({ ranges }) => {
// const [currentTimerange, setCurrentTimerange] = useState<Timerange>(
//   ranges[0]
// );
const ReservableTimes: React.FC<ReservableTimesProps> = () => {
  const addTimerange = useCallback(() => {}, []);
  const handleSubmit = useCallback(() => {}, []);
  const methods = useForm();
  return (
    <div className={styles.root}>
      <h2>Buchbare Zeiten hinterlegen</h2>
      <FormContext {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <div className={styles.fields}>
            <div>stub: Selector</div>
            <Spacer />

            <DaySelector name="day" />

            <Spacer />

            <div className={styles.timeframe}>
              <TextField label="Uhrzeit von" name="timeFrom" required />
              <Spacer direction="column" />
              <TextField label="Uhrzeit bis" name="timeUntil" required />
            </div>

            <Spacer />

            <TextField
              label="Anzahl der Personen im Geschäft"
              name="amountOfCustomers"
              required
              type="number"
            />

            <Spacer />

            <h3>Wählbarer Zeitraum</h3>
            <RangeSlider min={5} max={120} />

            <Spacer />

            <Button
              className={styles.addButton}
              onClick={addTimerange}
              variant="secondary"
            >
              <span>Zeitraum hinzufügen</span>
              <PlusIcon />
            </Button>

            <Spacer />

            <Button className={styles.submit} type="submit">
              Fertig! Erzähl es deinen Kunden!
            </Button>
          </div>
        </form>
      </FormContext>
    </div>
  );
};

export default ReservableTimes;
