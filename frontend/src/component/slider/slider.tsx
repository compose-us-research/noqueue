import React from "react";
import ReactSlider from "react-slider";
import cn from "classnames";

import styles from "./slider.module.css";

interface SliderProps {
  disabled?: boolean;
  max?: number;
  min?: number;
  onChange?: (value: number | number[] | null | undefined) => void;
}

const noop = () => {};

const Slider: React.FC<SliderProps> = ({
  disabled = false,
  max = 120,
  min = 5,
  onChange = noop,
}) => {
  return (
    <div className={cn(styles.root, disabled && styles.disabled)}>
      <ReactSlider
        disabled={disabled}
        max={max}
        min={min}
        onChange={onChange}
        renderThumb={(props: any, state: any) => (
          <div {...props}>
            <div className={styles.thumbInfo}>{state.valueNow} Minuten</div>
          </div>
        )}
        thumbClassName={styles.thumb}
        trackClassName={styles.track}
      />
    </div>
  );
};

export default Slider;
