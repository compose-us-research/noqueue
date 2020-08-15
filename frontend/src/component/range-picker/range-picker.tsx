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
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={[start, end]}
      name={name}
      render={({ onChange, onBlur, value }) => (
        <DatePicker
          endDate={value[1]}
          inline
          onChange={(x) => {
            console.log("change", x);
            onChange(x);
          }}
          selected={value[0]}
          selectsRange
          startDate={value[0]}
        />
      )}
    />
  );
};

export default RangePicker;
