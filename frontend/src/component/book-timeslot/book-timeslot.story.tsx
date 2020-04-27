import React from "react";
import BookTimeslot from "./book-timeslot";

export default {
  title: "BookTimeslot",
  component: BookTimeslot,
};

export const Simple = () => <BookTimeslot day={new Date()} duration={5} />;
