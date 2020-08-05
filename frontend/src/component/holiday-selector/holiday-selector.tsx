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

interface RangePickerProps {
  endDate: Date;
  onChange: (dates: [Date, Date]) => void;
  startDate: Date;
}

const RangePicker: React.FC<RangePickerProps> = ({
  endDate,
  startDate,
  onChange,
}) => {
  return (
    <DatePicker
      endDate={endDate}
      inline
      onChange={onChange}
      selectsRange
      startDate={startDate}
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
        return (
          <React.Fragment key={id}>
            <RangePicker
              endDate={holiday.end}
              onChange={([start, end]) => {
                setValue(`${name}[${index}].start`, start);
                setValue(`${name}[${index}].end`, end);
              }}
              startDate={holiday.start}
            />
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
