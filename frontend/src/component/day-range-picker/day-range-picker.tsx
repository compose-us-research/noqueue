import React from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import { differenceInDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "../text-field/text-field";
import { AmountOfDays, AmountOfPeople } from "../../service/domain";
import RangeSlider from "../range-slider/range-slider";
import Spacer from "../spacer/spacer";

interface DayRangePickerProps {
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

const DayRangePicker: React.FC<DayRangePickerProps> = ({ range, name }) => {
  return (
    <>
      <Controller
        defaultValue={range}
        name={name}
        render={({ onChange, value }) => (
          <>
            <DatePicker
              endDate={value.end}
              inline
              onChange={([start, end]: any) => {
                onChange({ ...range, start, end });
              }}
              selectsRange
              startDate={value.start}
            />
            <Spacer />
            <TextField
              name={`${name}.customers`}
              defaultValue={range.customers}
              label="Mögliche Anzahl von Kunden"
            />
            <Spacer />
            <RangeSlider
              defaultValue={[range.minDuration, range.maxDuration]}
              min={0}
              max={differenceInDays(value.start, value.end)}
              onChange={(nextValue) => {
                if (Array.isArray(nextValue)) {
                  const [min, max] = nextValue;
                  onChange({ ...range, minDuration: min, maxDuration: max });
                }
              }}
              step={1}
            />
          </>
        )}
      />
    </>
  );
};

export default DayRangePicker;
