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
import { Dayslot } from "../../service/domain";

interface ReservableDaysProps {
  handleSubmit: SubmitHandler<
    Record<
      string,
      {
        customers: number;
        duration: { start: Date; end: Date };
        days: { minDuration: number; maxDuration: number };
      }[]
    >
  >;
}

const mapper = (data: any): Dayslot[] => {
  return data.member.map((m: any) => ({
    id: m.id,
    customers: m.customers,
    duration: { end: parseISO(m.end), start: parseISO(m.start) },
    days: {
      maxDuration: m.maxDuration,
      minDuration: m.minDuration,
    },
  }));
};

let id = 0;
const ReservableDays: React.FC<ReservableDaysProps> = ({ handleSubmit }) => {
  const dayslots = useShopFetch("/dayslot", { mapper });
  const methods = useForm({
    defaultValues: {
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
                <DayRangePicker
                  error={methods.errors.ranges?.[index]}
                  name={`ranges[${index}]`}
                  range={range}
                />
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
