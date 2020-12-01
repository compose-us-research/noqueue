import React from "react";
import DatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";
import { differenceInDays } from "date-fns";
import cn from "classnames";
import "react-datepicker/dist/react-datepicker.css";
import ControlledTextField from "../controlled-text-field/controlled-text-field";
import { AmountOfDays, AmountOfPeople } from "../../service/domain";
import ControlledRangeSlider from "../controlled-range-slider/controlled-range-slider";
import Spacer from "../spacer/spacer";
import styles from "./day-range-picker.module.css";

export interface DayRange {
  id?: any;
  customers: AmountOfPeople;
  duration: { end: Date; start: Date };
  days: {
    maxDuration: AmountOfDays;
    minDuration: AmountOfDays;
  };
}

interface DayRangePickerProps {
  error?: any;
  range: DayRange;
  name: string;
  checkForOverlaps: string;
  fields: DayRange[];
}

const DayRangePicker: React.FC<DayRangePickerProps> = ({
  error,
  name,
  range,
  checkForOverlaps,
  fields,
}) => {
  const { control, getValues, watch } = useFormContext();
  return (
    <div className={cn(styles.root, error && styles.error)}>
      <Controller
        defaultValue={{
          start: range.duration.start,
          end: range.duration.end,
        }}
        name={`${name}.duration`}
        rules={{
          validate: () => {
            const value = getValues(`${name}.duration`);
            const others = fields.reduce<DayRange[]>((acc, x, index) => {
              if (x.id === range.id) return acc;
              return [
                ...acc,
                watch(`${checkForOverlaps}[${index}]`) || fields[index],
              ];
            }, []);
            const startBeforeEnd = value.start <= value.end;
            const hasOverlaps = others.some((other: DayRange) => {
              return (
                (other.duration.start <= value.start &&
                  value.start <= other.duration.end) ||
                (other.duration.start <= value.end &&
                  value.end <= other.duration.end)
              );
            });
            return startBeforeEnd && !hasOverlaps;
          },
        }}
        render={({ onChange, value }) => (
          <DatePicker
            endDate={value.end}
            inline
            onChange={([start, end]: any) => {
              onChange({
                ...value,
                start,
                end,
              });
              control.trigger();
            }}
            selectsRange
            startDate={value.start}
          />
        )}
      />
      <Spacer />
      <Controller
        defaultValue={range.customers}
        name={`${name}.customers`}
        rules={{
          validate: () => {
            const value = getValues(`${name}.customers`);
            return value >= 0;
          },
        }}
        render={({ onChange, value }) => (
          <ControlledTextField
            hasError={error?.customers}
            name={`${name}.customers`}
            value={value}
            onChange={(event: any) => onChange(event.target.value)}
            label="Mögliche Anzahl von Kunden"
          />
        )}
      />
      <Spacer />
      <span className={styles.label}>Mögliche Dauer</span>
      <Controller
        defaultValue={{
          minDuration: range.days.minDuration,
          maxDuration: Math.min(
            range.days.maxDuration,
            Math.abs(
              differenceInDays(range.duration.start, range.duration.end)
            ) + 1
          ),
        }}
        name={`${name}.days`}
        // rules={{
        //   validate: () => {
        //     const duration = getValues(`${name}.duration`);
        //     const amountOfDays = getValues(`${name}.days`);

        //     return (
        //       1 <= amountOfDays.minDuration &&
        //       amountOfDays.maxDuration <=
        //         Math.abs(differenceInDays(duration.start, duration.end)) + 1
        //     );
        //   },
        // }}
        render={({ onChange, value }) => {
          const duration = watch(`${name}.duration`);
          const hasDuration = duration?.start && duration?.end;
          const max = hasDuration
            ? Math.abs(differenceInDays(duration.start, duration.end)) + 1
            : 1;
          return (
            <ControlledRangeSlider
              disabled={!hasDuration}
              label="Tage"
              max={max}
              min={1}
              minDistance={0}
              onChange={(nextValue) => {
                if (Array.isArray(nextValue)) {
                  const [min, max] = nextValue;
                  onChange({ minDuration: min, maxDuration: max });
                }
              }}
              step={1}
              value={[
                value.minDuration || 1,
                Math.min(value.maxDuration, max) || 1,
              ]}
            />
          );
        }}
      />
    </div>
  );
};

export default DayRangePicker;
