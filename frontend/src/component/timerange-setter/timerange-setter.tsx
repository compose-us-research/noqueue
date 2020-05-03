import React, { useState, useCallback } from "react";
import cn from "classnames";

import { ReactComponent as ChevronIcon } from "../../asset/image/chevron-icon.svg";
import DaySelector from "../day-selector/day-selector";
import Spacer from "../spacer/spacer";
import TextField from "../text-field/text-field";
import RangeSlider from "../multi-slider/range-slider";
import styles from "./timerange-setter.module.css";
import Button from "../button/button";

interface TimerangeSetter {
  label: string;
  remover: () => void;
}

const TimerangeSetter: React.FC<TimerangeSetter> = ({ label, remover }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleOpen = useCallback(() => setOpen((open) => !open), [setOpen]);
  return (
    <div className={cn(styles.root, isOpen && styles.open)}>
      <Button
        className={styles.expander}
        onClick={toggleOpen}
        variant="secondary"
      >
        <span className={styles.expandText}>{label}</span>
        <span className={styles.chevron}>
          <ChevronIcon />
        </span>
      </Button>
      <Spacer />
      <div className={styles.details}>
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
          className={styles.remover}
          onClick={remover}
          variant="secondary"
        >
          Zeitraum löschen
        </Button>

        <Spacer />
      </div>
    </div>
  );
};

export default TimerangeSetter;
