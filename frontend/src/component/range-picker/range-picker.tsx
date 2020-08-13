import React, { useCallback, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useFormContext } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

interface RangePickerProps {
  end?: Date;
  name: string;
  start?: Date;
}

const RangePicker: React.FC<RangePickerProps> = ({ start, end, name }) => {
  const { register, setValue } = useFormContext();
  const [startDate, setStartDate] = useState<Date | undefined>(start);
  const [endDate, setEndDate] = useState<Date | undefined>(end);
  const change = useCallback(
    (change) => {
      const [start, end] = change as [Date, Date];
      setStartDate(start);
      setEndDate(end);
      setValue(name, { ...end, start });
    },
    [name, setEndDate, setStartDate, setValue]
  );

  useEffect(() => {
    register(name);
  }, [name, register]);

  return (
    <DatePicker
      name={name}
      endDate={endDate}
      inline
      onChange={change}
      selected={startDate}
      selectsRange
      startDate={startDate}
    />
  );
};

export default RangePicker;
