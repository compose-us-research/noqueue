import React, { useMemo } from "react";
import ReactSlider from "react-slider";
import cn from "classnames";

import styles from "./slider.module.css";

type ValueToString = (value: number) => string;

interface SliderProps {
  disabled?: boolean;
  label?: string | ValueToString;
  max?: number;
  min?: number;
  onChange?: (value: number | number[] | null | undefined) => void;
  step?: number;
}

const noop = () => {};

const Slider: React.FC<SliderProps> = ({
  disabled = false,
  label = "Minuten",
  max = 120,
  min = 5,
  onChange = noop,
  step = 15,
}) => {
  const renderLabel = useMemo(() => {
    if (typeof label === "function") {
      return label as ValueToString;
    }
    return (value: number) => `${value} ${label}`;
  }, [label]);
  return (
    <div className={cn(styles.root, disabled && styles.disabled)}>
      <ReactSlider
        disabled={disabled}
        max={max}
        min={min}
        onChange={onChange}
        renderThumb={(props: any, state: any) => (
          <div {...props}>
            <div className={styles.thumbInfo}>
              {renderLabel(state.valueNow)}
            </div>
          </div>
        )}
        step={step}
        thumbClassName={styles.thumb}
        trackClassName={styles.track}
      />
    </div>
  );
};

export default Slider;
