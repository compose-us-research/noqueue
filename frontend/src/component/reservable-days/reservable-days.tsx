import React from "react";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  FormProvider,
} from "react-hook-form";
import { parseISO } from "date-fns";

import styles from "./reservable-days.module.css";
import DayRangePicker, { DayRange } from "../day-range-picker/day-range-picker";
import Spacer from "../spacer/spacer";
import Button from "../button/button";
import { useShopFetch } from "../../service/server/connection";

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

const mapper = (data: any): DayRange[] => {
  return data.member.map((m: any) => ({
    // id: m.id,
    customers: m.customers,
    duration: { end: parseISO(m.end), start: parseISO(m.start) },
    days: {
      maxDuration: m.maxDuration,
      minDuration: m.minDuration,
    },
  }));
};

const ReservableDays: React.FC<ReservableDaysProps> = ({ handleSubmit }) => {
  const dayslots = useShopFetch("/dayslot", { mapper });
  const methods = useForm({
    defaultValues: {
      ranges: dayslots,
    },
  });
  const { append, fields, remove } = useFieldArray<DayRange>({
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
                  range={range as DayRange}
                />
                <Button onClick={() => remove(index)}>Löschen</Button>
                <Spacer />
              </React.Fragment>
            );
          })}
          <Button
            onClick={() => {
              if (fields.length > 0) {
                const { id, ...newRange } = fields[fields.length - 1];
                return append(newRange);
              }

              return append({
                customers: 1,
                days: { minDuration: 1, maxDuration: 1 },
                duration: { start: new Date(), end: new Date() },
              });
            }}
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
