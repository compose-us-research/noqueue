import React from "react";
import DatePicker from "react-datepicker";
import { useFormContext, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { watch } from "fs";

interface RangePickerProps {
  range: { id?: any; start?: Date; end?: Date };
  name: string;
}

const RangePicker: React.FC<RangePickerProps> = ({ range, name }) => {
  const { setValue } = useFormContext();
  console.log("using", { name, range });
  return (
    <Controller
      defaultValue={range}
      name={name}
      render={({ onChange, value }) => (
        <DatePicker
          endDate={value.end}
          inline
          onChange={([start, end]: any) => {
            onChange({ ...range, start, end });
            setValue(`${name}.start`, start);
            setValue(`${name}.end`, end);
          }}
          selectsRange
          startDate={value.start}
        />
      )}
    />
  );
};

export default RangePicker;
