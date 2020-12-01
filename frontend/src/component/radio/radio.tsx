import React from "react";
import { useFormContext } from "react-hook-form";
import cn from "classnames";

import styles from "./radio.module.css";

interface RadioProps {
  label: string;
  name: string;
  value: string;
}

const Radio: React.FC<RadioProps> = ({ label, name, value }) => {
  const { register, watch } = useFormContext();
  const selected = watch(name);
  return (
    <label className={cn(styles.root, selected === value && styles.checked)}>
      <input
        className={styles.input}
        type="radio"
        ref={register}
        name={name}
        value={value}
      />
      <div className={styles.radio}></div>
      <div className={styles.label}>{label}</div>
    </label>
  );
};

export default Radio;
