import React from "react";
import cn from "classnames";

import styles from "./day-selector.module.css";
import { useFormContext, Controller } from "react-hook-form";
import { Day, DaysInWeek } from "../../service/domain";

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
const hasAtLeastOneDaySet = (days: DaysInWeek) => {
  return days.some((day) => day);
};
const toBackendIndex = (index: number) => {
  return (index + 1) % options.length;
};

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
      <Controller
        as={
          <React.Fragment>
            {options.map((option, index) => (
              <button
                key={option}
                className={
                  selected[toBackendIndex(index)]
                    ? styles.selected
                    : styles.option
                }
                disabled={disabled}
                onClick={() => {
                  const backendIndex = toBackendIndex(index);
                  const newSelected = [
                    ...selected.slice(0, backendIndex),
                    !selected[backendIndex],
                    ...selected.slice(backendIndex + 1),
                  ] as AvailableDays;
                  setValue(name, newSelected, true);
                  onChange(newSelected);
                }}
                type="button"
              >
                {option}
              </button>
            ))}
          </React.Fragment>
        }
        control={control}
        defaultValue={selected}
        name={name}
        rules={{ validate: hasAtLeastOneDaySet }}
      />
    </div>
  );
};

export default DaySelector;
