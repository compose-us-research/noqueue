import React, { useState, useCallback } from "react";
import cn from "classnames";

import { ReactComponent as ChevronIcon } from "../../asset/image/chevron-icon.svg";
import { ReactComponent as RemoveIcon } from "../../asset/image/remove-icon.svg";
import DaySelector from "../day-selector/day-selector";
import Spacer from "../spacer/spacer";
import TextField from "../text-field/text-field";
import TimeslotLength from "../timeslot-length/timeslot-length";
import styles from "./timerange-setter.module.css";
import Button from "../button/button";
import { Timerange } from "../../service/domain";
import daysToString from "../../lib/days-to-string/days-to-string";
import { useFormContext, Validate } from "react-hook-form";
import ErrorBoundary from "../error-boundary/error-boundary";
import { checkTime } from "../../lib/calculate-max-duration/calculate-max-duration";

interface TimerangeSetterProps {
  index: number;
  label: string;
  name: string;
  range: Timerange;
  remover: () => void;
}

const TimerangeSetter: React.FC<TimerangeSetterProps> = ({
  index,
  label,
  name,
  range,
  remover,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [days, setDays] = useState<string>(daysToString(range.days));
  const { errors, watch } = useFormContext();
  const slots = `${days} ${range.start} - ${range.end} Uhr`;
  const toggleOpen = useCallback(() => setOpen((open) => !open), [setOpen]);
  const hasError = errors[name] && errors[name][index];
  const prefix = `${name}[${index}]`;
  const start = watch(`${prefix}.start`, range.start);
  const end = watch(`${prefix}.end`, range.end);
  const checkTimeValidator = useCallback<Validate>((value) => {
    try {
      checkTime(value);
      return true;
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      }
      return false;
    }
  }, []);

  return (
    <div
      className={cn(
        styles.root,
        isOpen && styles.open,
        hasError && styles.error
      )}
    >
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
      <div className={styles.details}>
        <h3>Zeitraum für folgende Tage</h3>
        <DaySelector
          defaultValue={range.days}
          name={`${prefix}.days`}
          onChange={(days) => setDays(daysToString(days))}
        />
        {errors.ranges && errors.ranges[index] && errors.ranges[index].days && (
          <div>Mindestens ein Tag muss ausgewählt werden.</div>
        )}

        <Spacer />

        <div className={styles.timeframe}>
          <TextField
            defaultValue={range.start}
            label="Uhrzeit von"
            name={`${prefix}.start`}
            placeholder="08:00"
            required
            validate={checkTimeValidator}
          />
          <Spacer direction="column" />
          <TextField
            defaultValue={range.end}
            label="Uhrzeit bis"
            name={`${prefix}.end`}
            placeholder="17:30"
            required
            validate={checkTimeValidator}
          />
        </div>

        <Spacer />

        <TextField
          label="Anzahl der Personen im Geschäft"
          name={`${prefix}.amountOfPeopleInShop`}
          placeholder="5"
          required
          type="number"
        />

        <Spacer />

        <h3>
          Wählbarer Zeitraum{" "}
          <span className={styles.rangeDescription}>
            (min. und max. in Minuten)
          </span>
        </h3>
        <ErrorBoundary resetKeys={[start, end]}>
          <TimeslotLength
            key={`${prefix}.duration-${isOpen ? "open" : "close"}`}
            end={end}
            name={`${prefix}.duration`}
            start={start}
          />
        </ErrorBoundary>

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
