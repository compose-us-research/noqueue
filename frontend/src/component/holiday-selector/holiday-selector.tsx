import React from "react";
import cn from "classnames";

import { ReactComponent as PlusIcon } from "../../asset/image/plus-icon.svg";
import { ReactComponent as RemoveIcon } from "../../asset/image/remove-icon.svg";
import styles from "./holiday-selector.module.css";
import { useFormContext, useFieldArray } from "react-hook-form";
import Button from "../button/button";
import Spacer from "../spacer/spacer";
import RangePicker from "../day-range-picker/day-range-picker";

interface HolidaySelectorProps {
  name: string;
}

let id = 0;
const HolidaySelector: React.FC<HolidaySelectorProps> = ({ name }) => {
  const { control } = useFormContext();
  const { append, fields, remove } = useFieldArray<{
    end?: Date;
    start?: Date;
  }>({
    control,
    name,
  });

  return (
    <div className={cn(styles.root)}>
      {fields.map((holiday, index) => {
        const id = holiday.id as any;
        const prefix = `${name}[${index}]`;
        return (
          <React.Fragment key={id}>
            <RangePicker range={holiday} name={`${prefix}.range`} />
            <Button
              className={styles.addButton}
              onClick={() => {
                remove(index);
              }}
              variant="secondary"
            >
              <span>Urlaubszeiten löschen</span>
              <RemoveIcon />
            </Button>
            <Spacer />
          </React.Fragment>
        );
      })}

      <Button
        className={styles.addButton}
        onClick={() => {
          const appendHoliday = {
            id: ++id,
            start: new Date(),
            end: new Date(+new Date() + 1000 * 60 * 60 * 24),
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
