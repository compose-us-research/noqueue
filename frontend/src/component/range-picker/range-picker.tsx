import React from "react";
import DatePicker from "react-datepicker";
import { useFormContext, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

interface RangePickerProps {
  range: { id?: any; start?: Date; end?: Date };
  name: string;
}

const RangePicker: React.FC<RangePickerProps> = ({ range, name }) => {
  const { start, end } = range;
  return (
    <Controller
      defaultValue={{ start, end }}
      name={name}
      render={({ onChange, value }) => (
        <DatePicker
          endDate={value.end}
          inline
          onChange={([start, end]: any) => onChange({ ...range, start, end })}
          selectsRange
          startDate={value.start}
        />
      )}
    />
  );
};

export default RangePicker;
