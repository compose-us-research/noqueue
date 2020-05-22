import React, { Suspense } from "react";
import ChooseTicket from "./choose-ticket";
import { action } from "@storybook/addon-actions";
import Loader from "../loader/loader";

export default {
  title: "Screens/ChooseTicket",
  component: ChooseTicket,
};

export const Simple = () => (
  <Suspense fallback={<Loader />}>
    <ChooseTicket onSelect={action("reserved slot")} />
  </Suspense>
);
