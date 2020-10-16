import React from "react";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  FormProvider,
} from "react-hook-form";
import { parseISO } from "date-fns";

import styles from "./reservable-days.module.css";
import DayRangePicker from "../day-range-picker/day-range-picker";
import Spacer from "../spacer/spacer";
import Button from "../button/button";
import { useShopFetch } from "../../service/server/connection";
import { AvailableSlot } from "../../service/domain";

interface ReservableDaysProps {
  handleSubmit: SubmitHandler<Record<string, any>>;
}

const mapper = (data: any): AvailableSlot[] => {
  return data.member.map((m: any) => ({
    ...m,
    end: parseISO(m.end),
    maxDuration: m.max_duration,
    minDuration: m.min_duration,
    start: parseISO(m.start),
  }));
};

let id = 0;
const ReservableDays: React.FC<ReservableDaysProps> = ({ handleSubmit }) => {
  const dayslots = useShopFetch("/dayslot", { mapper });
  const methods = useForm({
    defaultValues: {
      holidays: [],
      ranges: dayslots.map((range) => ({ ...range, id: id++ })),
    },
  });
  const { append, fields, remove } = useFieldArray({
    control: methods.control,
    name: "ranges",
  });
  return (
    <div className={styles.root}>
      <h2>Buchbare Tage hinterlegen</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Spacer />
          {fields.map((range, index) => {
            return (
              <React.Fragment key={range.id}>
                <DayRangePicker name={`ranges[${index}]`} range={range} />
                <Button onClick={() => remove(index)}>Löschen</Button>
                <Spacer />
              </React.Fragment>
            );
          })}
          <Button
            onClick={() =>
              append({ id: id++, start: new Date(), end: new Date() })
            }
          >
            Hinzufügen
          </Button>

          <Spacer />
          <Button className={styles.submit} type="submit">
            Fertig! Erzähl es deinen Kunden!
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ReservableDays;
