import React from "react";
import DatePicker from "react-datepicker";
import { useFormContext, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

interface RangePickerProps {
  end?: Date;
  name: string;
  start?: Date;
}

const RangePicker: React.FC<RangePickerProps> = ({ start, end, name }) => {
  return (
    <Controller
      defaultValue={{ start, end }}
      name={name}
      render={({ onChange, value }) => (
        <DatePicker
          endDate={value.end}
          inline
          onChange={([start, end]: any) => onChange({ start, end })}
          selectsRange
          startDate={value.start}
        />
      )}
    />
  );
};

export default RangePicker;
