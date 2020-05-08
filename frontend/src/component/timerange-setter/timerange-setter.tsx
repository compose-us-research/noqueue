import React, { useState, useCallback } from "react";
import cn from "classnames";

import { ReactComponent as ChevronIcon } from "../../asset/image/chevron-icon.svg";
import { ReactComponent as RemoveIcon } from "../../asset/image/remove-icon.svg";
import DaySelector from "../day-selector/day-selector";
import Spacer from "../spacer/spacer";
import TextField from "../text-field/text-field";
import RangeSlider from "../multi-slider/range-slider";
import styles from "./timerange-setter.module.css";
import Button from "../button/button";
import { Timerange } from "../../service/domain";
import daysToString from "../../lib/days-to-string/days-to-string";
import { useFormContext } from "react-hook-form";

interface TimerangeSetter {
  label: string;
  prefix: string;
  range: Timerange;
  remover: () => void;
}

const TimerangeSetter: React.FC<TimerangeSetter> = ({
  label,
  prefix,
  range,
  remover,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [days, setDays] = useState<string>(daysToString(range.days));
  const slots = `${days} ${range.timeFrom} - ${range.timeUntil} Uhr`;
  const toggleOpen = useCallback(() => setOpen((open) => !open), [setOpen]);
  return (
    <div className={cn(styles.root, isOpen && styles.open)}>
      <Button
        className={styles.expander}
        onClick={toggleOpen}
        variant="secondary"
      >
        <div className={styles.expandText}>
          <div className={styles.label}>{label}</div>
          <div className={styles.slots}>{slots}</div>
        </div>
        <span className={styles.chevron}>
          <ChevronIcon />
        </span>
      </Button>
      <Spacer />
      <div className={styles.details}>
        <DaySelector
          defaultValue={range.days}
          name={`${prefix}.day`}
          onChange={(days) => {
            console.log({ days });
            setDays(daysToString(days));
          }}
        />

        <Spacer />

        <div className={styles.timeframe}>
          <TextField
            defaultValue={range.timeFrom}
            label="Uhrzeit von"
            name={`${prefix}.timeFrom`}
            required
          />
          <Spacer direction="column" />
          <TextField
            defaultValue={range.timeUntil}
            label="Uhrzeit bis"
            name={`${prefix}.timeUntil`}
            required
          />
        </div>

        <Spacer />

        <TextField
          label="Anzahl der Personen im Geschäft"
          name={`${prefix}.amountOfCustomers`}
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
          <RemoveIcon />
          <Spacer direction="column" />
          Löschen
        </Button>

        <Spacer />
      </div>
    </div>
  );
};

export default TimerangeSetter;
