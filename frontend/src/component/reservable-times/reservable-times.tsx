import React, { useCallback, useState } from "react";

import { ReactComponent as PlusIcon } from "../../asset/image/plus-icon.svg";
import { Timerange } from "../../service/domain";
import Button from "../button/button";
import styles from "./reservable-times.module.css";
import { FormContext, useForm } from "react-hook-form";
import Spacer from "../spacer/spacer";
import TimerangeSetter from "../timerange-setter/timerange-setter";

interface ReservableTimesProps {
  ranges: Timerange[];
}

function createNewTimerange(lastRange?: Timerange): Timerange {
  return {
    amountOfPeopleInShop: lastRange?.amountOfPeopleInShop || 0,
    day: lastRange?.day || "Mo",
    timeFrom: lastRange?.timeFrom,
    timeTo: lastRange?.timeTo,
    timeframeFrom: lastRange?.timeframeFrom,
    timeframeTo: lastRange?.timeframeTo,
  };
}

const ReservableTimes: React.FC<ReservableTimesProps> = ({ ranges }) => {
  const [currentRanges, setCurrentRanges] = useState(ranges);
  const addTimerange = useCallback(
    () => setCurrentRanges((rs) => [...rs, createNewTimerange()]),
    [setCurrentRanges]
  );
  const handleSubmit = useCallback(() => {}, []);
  const methods = useForm();
  return (
    <div className={styles.root}>
      <h2>Buchbare Zeiten hinterlegen</h2>
      <FormContext {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Spacer />
          <div className={styles.fields}>
            {currentRanges.map((range, index) => (
              <TimerangeSetter
                key={index}
                label={`Zeitraum ${index + 1}`}
                remover={() =>
                  setCurrentRanges((current) =>
                    current.filter((r) => r !== range)
                  )
                }
              />
            ))}

            <Button
              className={styles.addButton}
              onClick={addTimerange}
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
