import React from "react";

import { ReactComponent as PlusIcon } from "../../asset/image/plus-icon.svg";
import { Timerange, Timeslot } from "../../service/domain";
import Button from "../button/button";
import styles from "./reservable-times.module.css";
import { FormContext, useForm, OnSubmit, useFieldArray } from "react-hook-form";
import Spacer from "../spacer/spacer";
import TimerangeSetter from "../timerange-setter/timerange-setter";
import { useShopFetch } from "../../service/server/connection";
import generateTimerangesFromTimeslots from "../../lib/generate-timeranges-from-timeslots/generate-timeranges-from-timeslots";

interface ReservableTimesProps {
  handleSubmit: OnSubmit<Record<string, any>>;
}

function createNewTimerange(lastRange?: Timerange): Timerange {
  return {
    amountOfPeopleInShop: lastRange?.amountOfPeopleInShop || 0,
    days: lastRange?.days || [true, true, true, true, true, false, false],
    start: lastRange?.start || "08:00",
    end: lastRange?.end || "18:00",
    minDuration: lastRange?.minDuration || 5,
    maxDuration: lastRange?.maxDuration || 120,
  };
}

let id = 1;
const ReservableTimes: React.FC<ReservableTimesProps> = ({ handleSubmit }) => {
  const data = useShopFetch("/timeslot");
  console.log({ timeslots: data });
  const timeranges = generateTimerangesFromTimeslots(data as Timeslot[]);
  const methods = useForm({
    defaultValues: {
      ranges: timeranges.map((range) => ({ ...range, id: id++ })),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "ranges",
  });
  console.log("rendering ReservableTimes");
  return (
    <div className={styles.root}>
      <h2>Buchbare Zeiten hinterlegen</h2>
      <FormContext {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Spacer />
          <div className={styles.fields}>
            {fields.map((range, index) => (
              <TimerangeSetter
                key={range.id}
                label={`Zeitraum ${index + 1}`}
                prefix={`ranges[${index}]`}
                range={range as Timerange}
                remover={() => remove(index)}
              />
            ))}

            <Button
              className={styles.addButton}
              onClick={() =>
                append({
                  ...createNewTimerange(fields[fields.length - 1] as Timerange),
                  id: id++,
                })
              }
              variant="secondary"
            >
              <span>Zeitraum hinzufügen</span>
              <PlusIcon />
            </Button>
            <Spacer />
            <Button className={styles.submit} type="submit">
              Fertig! Erzähl es deinen Kunden!
            </Button>
          </div>
        </form>
      </FormContext>
    </div>
  );
};

export default ReservableTimes;
