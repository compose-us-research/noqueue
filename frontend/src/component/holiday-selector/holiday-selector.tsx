import React from "react";
import cn from "classnames";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ReactComponent as PlusIcon } from "../../asset/image/plus-icon.svg";
import { ReactComponent as RemoveIcon } from "../../asset/image/remove-icon.svg";
import styles from "./holiday-selector.module.css";
import { useFormContext, useFieldArray } from "react-hook-form";
import Button from "../button/button";
import Spacer from "../spacer/spacer";

interface HolidaySelectorProps {
  name: string;
}

interface RangePickerProps {
  holiday: any;
  onChange: (dates: [Date, Date]) => void;
}

const RangePicker: React.FC<RangePickerProps> = ({ holiday, onChange }) => {
  return (
    <DatePicker
      endDate={holiday.end}
      inline
      onChange={onChange}
      selectsRange
      startDate={holiday.start}
    />
  );
};

let id = 0;
const HolidaySelector: React.FC<HolidaySelectorProps> = ({ name }) => {
  const { control, setValue } = useFormContext();
  const { append, fields, remove } = useFieldArray({ control, name });

  return (
    <div className={cn(styles.root)}>
      {fields.map((holiday, index) => {
        const id = holiday.id as any;
        const prefix = `${name}[${index}]`;
        console.log({ holiday });
        return (
          <React.Fragment key={id}>
            <RangePicker
              holiday={holiday}
              onChange={([start, end]) => {
                console.log({ start, end });
                setValue(prefix, { ...holiday, start, end });
              }}
            />
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
