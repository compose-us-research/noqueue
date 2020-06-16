import React, { Suspense } from "react";
import CurrentShop from "./current-shop";

export default {
  title: "CurrentShop",
  component: CurrentShop,
};

export const Default = () => (
  <Suspense fallback={<div>Lade...</div>}>
    <CurrentShop />
  </Suspense>
);
