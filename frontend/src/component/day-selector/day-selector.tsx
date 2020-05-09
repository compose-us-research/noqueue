import React from "react";
import cn from "classnames";

import styles from "./day-selector.module.css";
import { useFormContext, Controller } from "react-hook-form";
import { Day } from "../../service/domain";

type AvailableDays = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
];

interface DaySelectorProps {
  className?: string;
  defaultValue?: AvailableDays;
  disabled?: boolean;
  name: string;
  onChange?: (selectedDays: AvailableDays) => void;
}

const noop = () => {};
const options: Day[] = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const DaySelector: React.FC<DaySelectorProps> = ({
  className = undefined,
  defaultValue = [true, false, false, false, false, false, false],
  disabled = false,
  name,
  onChange = noop,
}) => {
  const { control, setValue, watch } = useFormContext();
  const selected = watch(name, defaultValue);

  return (
    <div className={cn(styles.root, disabled && styles.disabled, className)}>
      {options.map((option, index) => (
        <Controller
          as={
            <button
              key={option}
              className={selected[index] ? styles.selected : styles.option}
              disabled={disabled}
              onClick={() => {
                const newSelected = [
                  ...selected.slice(0, index),
                  !selected[index],
                  ...selected.slice(index + 1),
                ] as AvailableDays;
                setValue(name, newSelected);
                onChange(newSelected);
              }}
              type="button"
            >
              {option}
            </button>
          }
          control={control}
          defaultValue={selected[index]}
          key={index}
          name={`${name}[${index}]`}
        />
      ))}
    </div>
  );
};

export default DaySelector;
