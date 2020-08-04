import React from "react";
import cn from "classnames";

import { ReactComponent as PlusIcon } from "../../asset/image/plus-icon.svg";
import styles from "./holiday-selector.module.css";
import { useFormContext, useFieldArray } from "react-hook-form";
import Button from "../button/button";
import Spacer from "../spacer/spacer";
import Stub from "../stub/stub";

interface HolidaySelectorProps {
  name: string;
}

let id = 0;
const HolidaySelector: React.FC<HolidaySelectorProps> = ({ name }) => {
  const { control } = useFormContext();
  const { append, fields, remove } = useFieldArray({ control, name });

  return (
    <div className={cn(styles.root)}>
      {fields.map((holiday, index) => {
        const id = holiday.id as any;
        return (
          <React.Fragment key={id}>
            <Stub
              next={() => {
                console.log("pressed next");
              }}
            >
              <Button
                className={styles.remover}
                onClick={() => remove(index)}
                variant="secondary"
              >
                <Spacer direction="column" />
                Löschen
              </Button>
            </Stub>
            <Spacer />
          </React.Fragment>
        );
      })}

      <Button
        className={styles.addButton}
        onClick={() => {
          const appendHoliday = {
            id: ++id,
          };
          append(appendHoliday);
        }}
        variant="secondary"
      >
        <span>Urlaubstage hinzufügen</span>
        <PlusIcon />
      </Button>
      <Spacer />
    </div>
  );
};

export default HolidaySelector;
