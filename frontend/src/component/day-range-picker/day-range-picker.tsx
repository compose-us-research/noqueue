import React from "react";
import DatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";
import { differenceInDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import ControlledTextField from "../controlled-text-field/controlled-text-field";
import { AmountOfDays, AmountOfPeople } from "../../service/domain";
import ControlledRangeSlider from "../controlled-range-slider/controlled-range-slider";
import Spacer from "../spacer/spacer";

interface DayRangePickerProps {
  error?: any;
  range: {
    id?: any;
    customers?: AmountOfPeople;
    end?: Date;
    maxDuration?: AmountOfDays;
    minDuration?: AmountOfDays;
    start?: Date;
  };
  name: string;
}

const DayRangePicker: React.FC<DayRangePickerProps> = ({
  error,
  name,
  range,
}) => {
  const { getValues } = useFormContext();
  return (
    <>
      <Controller
        defaultValue={{ start: range.start, end: range.end }}
        name={`${name}.duration`}
        rules={{
          validate: () => {
            const value = getValues(`${name}.duration`);
            return value.start < value.end;
          },
        }}
        render={({ onChange, value }) => (
          <DatePicker
            endDate={value.end}
            inline
            onChange={([start, end]: any) => {
              onChange({ ...value, start, end });
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
            console.log("getting validated customers?", value);
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
      <Controller
        defaultValue={{
          start: range.start,
          end: range.end,
          minDuration: range.minDuration,
          maxDuration: range.maxDuration,
        }}
        name={`${name}.days`}
        rules={{
          validate: () => {
            const value = getValues(`${name}.days`);
            console.log("getting validated days?", value);
            return value >= 0;
          },
        }}
        render={({ onChange, value }) => (
          <ControlledRangeSlider
            label="Tage"
            max={Math.abs(differenceInDays(value.start, value.end)) + 1}
            min={1}
            minDistance={0}
            onChange={(nextValue) => {
              if (Array.isArray(nextValue)) {
                const [min, max] = nextValue;
                onChange({ ...value, minDuration: min, maxDuration: max });
              }
            }}
            step={1}
            value={[value.minDuration || 1, value.maxDuration || 1]}
          />
        )}
      />
    </>
  );
};

export default DayRangePicker;
