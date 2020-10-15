import React from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import { differenceInDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import ControlledTextField from "../controlled-text-field/controlled-text-field";
import { AmountOfDays, AmountOfPeople } from "../../service/domain";
import ControlledRangeSlider from "../controlled-range-slider/controlled-range-slider";
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
  console.log("DayRangePicker render", { range });
  return (
    <>
      <Controller
        defaultValue={range}
        name={name}
        render={({ onChange, value }) => {
          console.log("render in controller", { value });
          return (
            <>
              <DatePicker
                endDate={value.end}
                inline
                onChange={([start, end]: any) => {
                  onChange({ ...value, start, end });
                }}
                selectsRange
                startDate={value.start}
              />
              <Spacer />
              <ControlledTextField
                name={`${name}.customers`}
                value={value.customers}
                onChange={(event: any) =>
                  onChange({ ...value, customers: event.target.value })
                }
                label="Mögliche Anzahl von Kunden"
              />
              <Spacer />
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
            </>
          );
        }}
      />
    </>
  );
};

export default DayRangePicker;
