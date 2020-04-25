import React from "react";
import ReactSlider from "react-slider";
import cn from "classnames";

import styles from "./slider.module.css";

interface SliderProps {
  disabled?: boolean;
  onChange?: () => void;
}

const noop = () => {};

const Slider: React.FC<SliderProps> = ({
  disabled = false,
  onChange = noop,
}) => {
  return (
    <ReactSlider
      className={cn(styles.root, disabled && styles.disabled)}
      onChange={onChange}
      renderThumb={(props: any, state: any) => (
        <div {...props}>
          <div className={styles.thumbInfo}>{state.valueNow} Minuten</div>
        </div>
      )}
      thumbClassName={styles.thumb}
      trackClassName={styles.track}
    />
  );
};

export default Slider;
