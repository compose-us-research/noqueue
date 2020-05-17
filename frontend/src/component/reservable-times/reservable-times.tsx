import React from "react";

import { ReactComponent as PlusIcon } from "../../asset/image/plus-icon.svg";
import { Timerange } from "../../service/domain";
import Button from "../button/button";
import styles from "./reservable-times.module.css";
import { FormContext, useForm, OnSubmit, useFieldArray } from "react-hook-form";
import Spacer from "../spacer/spacer";
import TimerangeSetter from "../timerange-setter/timerange-setter";
import { useFetch, useShop } from "../../service/server/connection";

interface ReservableTimesProps {
  handleSubmit: OnSubmit<Record<string, any>>;
}

let id = 1;

function createNewTimerange(lastRange?: Timerange): Timerange {
  return {
    id: `${id++}`,
    amountOfPeopleInShop: lastRange?.amountOfPeopleInShop || 0,
    days: lastRange?.days || [true, true, true, true, true, false, false],
    timeFrom: lastRange?.timeFrom || "08:00",
    timeUntil: lastRange?.timeUntil || "18:00",
    timeframeFrom: lastRange?.timeframeFrom || 5,
    timeframeTo: lastRange?.timeframeTo || 120,
  };
}

const ReservableTimes: React.FC<ReservableTimesProps> = ({ handleSubmit }) => {
  const shop = useShop();
  const data = useFetch(`/shop/${shop["@id"]}/timeslot`);
  const methods = useForm({ defaultValues: { ranges: data } });
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
                key={index}
                label={`Zeitraum ${index + 1}`}
                prefix={`ranges[${index}]`}
                range={range as Timerange}
                remover={() => remove(index)}
              />
            ))}

            <Button
              className={styles.addButton}
              onClick={() => append(createNewTimerange())}
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
