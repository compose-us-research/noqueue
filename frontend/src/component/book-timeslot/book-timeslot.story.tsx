import React, { Suspense } from "react";
import BookTimeslot from "./book-timeslot";
import { action } from "@storybook/addon-actions";

export default {
  title: "BookTimeslot",
  component: BookTimeslot,
};

export const Simple = () => (
  <Suspense fallback={<div>Loading</div>}>
    <BookTimeslot
      bookTicketForSlot={action("book ticket")}
      day={new Date()}
      duration={5}
    />
  </Suspense>
);
