import React, { useCallback, useMemo } from "react";
import ReactSlider from "react-slider";
import cn from "classnames";

import styles from "./range-slider.module.css";

interface RangeSliderProps {
  disabled?: boolean;
  max?: number;
  min?: number;
  onChange?: (value: number | number[] | null | undefined) => void;
}

const noop = () => {};

const RangeSlider: React.FC<RangeSliderProps> = ({
  disabled = false,
  max = 120,
  min = 5,
  onChange = noop,
}) => {
  const values = useMemo(() => [min, max], [min, max]);
  const renderThumb = useCallback(
    (props: any, state: any) => (
      <div {...props}>
        <div
          className={`${styles.thumbInfo} ${
            state.index === 0 ? styles.thumbInfo1 : styles.thumbInfo2
          }`}
        >
          {state.valueNow} Minuten
        </div>
      </div>
    ),
    []
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
        defaultValue={values}
        disabled={disabled}
        max={max}
        min={min}
        minDistance={1}
        onChange={onChange}
        renderThumb={renderThumb}
        renderTrack={renderTrack}
        thumbClassName={styles.thumb}
        trackClassName={styles.track}
      />
    </div>
  );
};

export default RangeSlider;
