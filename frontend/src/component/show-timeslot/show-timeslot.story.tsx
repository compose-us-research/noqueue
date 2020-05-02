import React from "react";
import ShowTimeslot from "./show-timeslot";

export default {
  title: "Screens/ShowTimeslot",
  component: ShowTimeslot,
};

export const Simple = () => (
  <ShowTimeslot
    timeslot={{
      id: 1,
      from: new Date("2020-04-26Z15:30:00"),
      to: new Date("2020-04-26Z16:30:00"),
    }}
  />
);
