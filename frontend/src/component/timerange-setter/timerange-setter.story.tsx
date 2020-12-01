import React from "react";
import TimerangeSetter from "./timerange-setter";
import Form from "../../../.storybook/helper/form";
import { action } from "@storybook/addon-actions";
import { Timerange } from "../../service/domain";

export default {
  title: "TimerangeSetter",
  component: TimerangeSetter,
};

export const Regular = () => {
  const range: Timerange = {
    start: "08:00",
    end: "18:00",
    amountOfPeopleInShop: 5,
    days: [true, false, true, false, true, false, true],
    duration: [5, 15],
  };
  return (
    <Form>
      <TimerangeSetter
        index={0}
        isOpen={true}
        label="Timerange"
        name="timerange"
        range={range}
        remover={action("removed")}
        toggleOpen={action("toggle open")}
      />
    </Form>
  );
};
