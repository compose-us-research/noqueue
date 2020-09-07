import React from "react";
import { useFormContext } from "react-hook-form";

import styles from "./radio.module.css";
import Spacer from "../spacer/spacer";

interface RadioProps {
  label: string;
  name: string;
  value: string;
}

const Radio: React.FC<RadioProps> = ({ label, name, value }) => {
  const { register } = useFormContext();
  return (
    <label className={styles.root}>
      <Spacer direction="column" />
      <input
        className={styles.input}
        type="radio"
        ref={register}
        name={name}
        value={value}
      />
      <div className={styles.radio}></div>
      <Spacer direction="column" />
      <div className={styles.label}>{label}</div>
    </label>
  );
};

export default Radio;
