import React, { useState, useCallback, useEffect } from "react";
import cn from "classnames";

import styles from "./day-selector.module.css";
import { useFormContext } from "react-hook-form";

interface DaySelectorProps {
  className?: string;
  disabled?: boolean;
  name: string;
}

const options = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function DaySelector({
  className = undefined,
  disabled = false,
  name,
}: DaySelectorProps) {
  const { register, setValue, unregister, watch } = useFormContext();
  const defaultValue = "Mo";
  const selected = watch(name, defaultValue);

  useEffect(() => {
    register({ name });
    setValue(name, defaultValue);

    return () => unregister(name);
  }, [register]);

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
