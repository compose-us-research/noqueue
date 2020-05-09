import React from "react";

import RangeSlider from "../range-slider/range-slider";
import { useFormContext, Controller } from "react-hook-form";
import calculateMaxDuration from "../../lib/calculate-max-duration/calculate-max-duration";

interface TimeslotLengthProps {
  end: string;
  name: string;
  start: string;
}

const TimeslotLength: React.FC<TimeslotLengthProps> = ({
  name,
  start,
  end,
}) => {
  const { control, setValue } = useFormContext();
  const maxDuration = calculateMaxDuration(start, end);
  return (
    <Controller
      as={
        <RangeSlider
          min={0}
          max={maxDuration}
          onChange={(value) => {
            if (Array.isArray(value)) {
              const [min, max] = value;
              setValue(name, [min, max]);
            }
          }}
        />
      }
      control={control}
      defaultValue={[0, maxDuration]}
      name={name}
      rules={{
        validate: (value) => {
          const [min, max] = value;
          return 0 <= min && min < max && max <= maxDuration;
        },
      }}
    />
  );
};

export default TimeslotLength;
