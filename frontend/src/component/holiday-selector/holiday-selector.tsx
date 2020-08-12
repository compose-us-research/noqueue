import React, { useCallback, useState } from "react";
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
  holiday: { end?: Date; start?: Date };
  name: string;
}

const RangePicker: React.FC<RangePickerProps> = ({ holiday, name }) => {
  const { setValue } = useFormContext();
  const [startDate, setStartDate] = useState<Date | undefined>(holiday.start);
  const [endDate, setEndDate] = useState<Date | undefined>(holiday.end);
  const change = useCallback(
    (change) => {
      const [start, end] = change as [Date, Date];
      setStartDate(start);
      setEndDate(end);
      console.log("setValue", name, { start, end });
      setValue(name, { ...holiday, start, end });
    },
    [setEndDate, setStartDate, setValue]
  );
  return (
    <DatePicker
      endDate={endDate}
      inline
      onChange={change}
      selected={startDate}
      selectsRange
      startDate={startDate}
    />
  );
};

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
        console.log({ holiday, prefix });
        return (
          <React.Fragment key={id}>
            <RangePicker holiday={holiday} name={prefix} />
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
