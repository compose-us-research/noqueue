import React from "react";
import { SubmitHandler, useFieldArray, useForm, FormProvider } from "react-hook-form";

import styles from "./reservable-days.module.css";
import RangePicker from "../range-picker/range-picker";
import Spacer from "../spacer/spacer";
import Button from "../button/button";
import { useShopFetch } from "../../service/server/connection";
import { AvailableSlot } from "../../service/domain";

interface ReservableDaysProps {
  handleSubmit: SubmitHandler<Record<string, any>>;
}

const mapper = (data: any): AvailableSlot[] => {
  return data.member;
};

let id = 0;
const ReservableDays: React.FC<ReservableDaysProps> = ({ handleSubmit }) => {
  const dayslots = useShopFetch("/dayslots", { mapper });
  const methods = useForm({
    defaultValues: {
      holidays: [],
      ranges: dayslots.map((range) => ({ ...range, id: ++id })),
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
              <>
                <RangePicker name={`ranges[${index}]`} range={range} />
                <Button onClick={() => remove(index)}>Löschen</Button>
                <Spacer />
              </>
            );
          })}
          <Button
            onClick={() =>
              append({ id: ++id, start: new Date(), end: new Date() })
            }
          >
            Hinzufügen
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ReservableDays;
