import React, { useEffect } from "react";
import cn from "classnames";

import styles from "./day-selector.module.css";
import { useFormContext } from "react-hook-form";

type DayOption = "Mo" | "Di" | "Mi" | "Do" | "Fr" | "Sa" | "So";

interface DaySelectorProps {
  className?: string;
  defaultValue?: DayOption;
  disabled?: boolean;
  name: string;
}

const options: DayOption[] = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function DaySelector({
  className = undefined,
  defaultValue = "Mo",
  disabled = false,
  name,
}: DaySelectorProps) {
  const { register, setValue, unregister, watch } = useFormContext();
  const selected = watch(name, defaultValue);

  useEffect(() => {
    register({ name });
    setValue(name, defaultValue);

    return () => unregister(name);
  }, [defaultValue, name, register, setValue, unregister]);

  return (
    <div className={cn(styles.root, disabled && styles.disabled, className)}>
      {options.map((option) => (
        <button
          key={option}
          className={selected === option ? styles.selected : styles.option}
          disabled={disabled}
          onClick={() => setValue(name, option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default DaySelector;
