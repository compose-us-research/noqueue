import React from "react";
import { useFormContext } from "react-hook-form";

import styles from "./checkbox.module.css";

interface CheckboxProps {
  name: string;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, name }) => {
  const { register } = useFormContext();
  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        id={name}
        name={name}
        ref={register}
        type="checkbox"
      />
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
