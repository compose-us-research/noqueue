import React from "react";
import cn from "classnames";
import DatePicker from "react-datepicker";

import { ReactComponent as PlusIcon } from "../../asset/image/plus-icon.svg";
import { ReactComponent as RemoveIcon } from "../../asset/image/remove-icon.svg";
import styles from "./holiday-selector.module.css";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import Button from "../button/button";
import Spacer from "../spacer/spacer";

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
            <Controller
              defaultValue={holiday}
              name={`${prefix}.range`}
              render={({ onChange, value }) => (
                <DatePicker
                  className={styles.datepicker}
                  calendarClassName={styles.datepicker}
                  dayClassName={() => styles.datepickerWeekAndDays}
                  endDate={value.end}
                  inline
                  monthClassName={() => styles.datepickerMonthContainer}
                  onChange={([start, end]: any) => {
                    onChange({ ...holiday, start, end });
                  }}
                  selectsRange
                  startDate={value.start}
                  weekDayClassName={() => styles.datepickerWeekAndDays}
                  wrapperClassName={styles.datepickerWrapper}
                />
              )}
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
