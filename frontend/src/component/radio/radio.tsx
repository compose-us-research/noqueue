import React from "react";
import { useFormContext } from "react-hook-form";

import styles from "./radio.module.css";

interface RadioProps {
  label: string;
  name: string;
  value: string;
}

const Radio: React.FC<RadioProps> = ({ label, name, value }) => {
  const { register } = useFormContext();
  return (
    <div className={styles.root}>
      <label>
        <input type="radio" ref={register} name={name} value={value} />
        {label}
      </label>
    </div>
  );
};

export default Radio;
