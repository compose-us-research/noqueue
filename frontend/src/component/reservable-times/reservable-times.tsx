import React, { useState } from "react";
import {
  FormProvider,
  useForm,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { parseISO } from "date-fns";

import { ReactComponent as PlusIcon } from "../../asset/image/plus-icon.svg";
import { AvailableSlot, Timerange, Timeslot } from "../../service/domain";
import Button from "../button/button";
import styles from "./reservable-times.module.css";
import HolidaySelector from "../holiday-selector/holiday-selector";
import Spacer from "../spacer/spacer";
import TimerangeSetter from "../timerange-setter/timerange-setter";
import { useShopFetch } from "../../service/server/connection";
import generateTimerangesFromTimeslots from "../../lib/generate-timeranges-from-timeslots/generate-timeranges-from-timeslots";

interface ReservableTimesProps {
  handleSubmit: SubmitHandler<{
    holidays: {
      range: {
        start: Date;
        end: Date;
      };
    }[];
    ranges: Timerange[];
  }>;
}

function createNewTimerange(lastRange?: Timerange): Timerange {
  return {
    amountOfPeopleInShop: lastRange?.amountOfPeopleInShop || 0,
    days: lastRange?.days || [true, true, true, true, true, false, false],
    start: lastRange?.start || "08:00",
    end: lastRange?.end || "18:00",
    duration: lastRange?.duration || [5, 120],
  };
}

const mapper = (data: any): Timeslot[] => {
  return data.member;
};

const holidayMapper = (data: any): AvailableSlot[] => {
  return data.member
    .filter((m: any) => m.customers === 0)
    .map((m: any) => ({
      ...m,
      end: parseISO(m.end),
      start: parseISO(m.start),
    }));
};

let id = 0;
let holidayId = 0;
const ReservableTimes: React.FC<ReservableTimesProps> = ({ handleSubmit }) => {
  const timeslots = useShopFetch("/timeslot", { mapper });
  const holidays = useShopFetch("/dayslot", { mapper: holidayMapper });
  const timeranges = generateTimerangesFromTimeslots(timeslots);
  const [opened, setOpened] = useState<{ [key: number]: boolean }>({});
  console.log({ timeranges, holidays });
  const methods = useForm({
    defaultValues: {
      holidays: holidays.map((range) => ({ ...range, id: ++holidayId })),
      ranges: timeranges.map((range) => ({ ...range, id: ++id })),
    },
  });
  const {
    fields: rangesFields,
    append: rangesAppend,
    remove: rangesRemove,
  } = useFieldArray({
    control: methods.control,
    name: "ranges",
  });

  return (
    <div className={styles.root}>
      <h2>Buchbare Zeiten hinterlegen</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Spacer />
          <div className={styles.fields}>
            {rangesFields.map((range, index) => {
              const id = range.id as any;
              return (
                <React.Fragment key={id}>
                  <TimerangeSetter
                    index={index}
                    isOpen={opened[id]}
                    label={`Zeitraum ${index + 1}`}
                    name={"ranges"}
                    range={range as Timerange}
                    remover={() => rangesRemove(index)}
                    toggleOpen={() =>
                      setOpened((old) => ({
                        ...old,
                        [id]: !old[id],
                      }))
                    }
                  />
                  <Spacer />
                </React.Fragment>
              );
            })}

            <Button
              className={styles.addButton}
              onClick={() => {
                const lastRange = rangesFields[
                  rangesFields.length - 1
                ] as Timerange;
                const appendTimerange = {
                  ...createNewTimerange(lastRange),
                  id: ++id,
                };
                setOpened({
                  [id]: true,
                });
                rangesAppend(appendTimerange);
              }}
              variant="secondary"
            >
              <span>Zeitraum hinzufügen</span>
              <PlusIcon />
            </Button>
            <Spacer />

            <HolidaySelector name="holidays" />
            <Spacer />

            <Button className={styles.submit} type="submit">
              Fertig! Erzähl es deinen Kunden!
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ReservableTimes;
