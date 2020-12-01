import React, { useCallback } from "react";
import ReactSlider from "react-slider";
import cn from "classnames";

import styles from "./controlled-range-slider.module.css";

interface ControlledRangeSliderProps {
  disabled?: boolean;
  label?: string;
  max?: number;
  min?: number;
  minDistance?: number;
  onChange?: (value: number | number[] | null | undefined) => void;
  step?: number;
  value: [number, number];
}

const noop = () => {};

const ControlledRangeSlider: React.FC<ControlledRangeSliderProps> = ({
  disabled = false,
  label = "Minuten",
  max = 120,
  min = 5,
  minDistance = 1,
  onChange = noop,
  step = 15,
  value = [min, max],
}) => {
  const renderThumb = useCallback(
    (props: any, state: any) => (
      <div {...props}>
        <div
          className={`${styles.thumbInfo} ${
            state.index === 0 ? styles.thumbInfo1 : styles.thumbInfo2
          }`}
        >
          {state.valueNow} {label}
        </div>
      </div>
    ),
    [label]
  );
  const renderTrack = useCallback(
    (props: any, state: any) => (
      <div
        {...props}
        className={`${props.className} ${
          state.index === 1 ? styles.middleTrack : styles.track
        }`}
      />
    ),
    []
  );
  return (
    <div className={cn(styles.root, disabled && styles.disabled)}>
      <ReactSlider
        disabled={disabled}
        max={max}
        min={min}
        minDistance={minDistance}
        onChange={onChange}
        renderThumb={renderThumb}
        renderTrack={renderTrack}
        step={step}
        thumbClassName={styles.thumb}
        trackClassName={styles.track}
        value={value}
      />
    </div>
  );
};

export default ControlledRangeSlider;
