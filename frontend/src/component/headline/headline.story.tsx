import React from "react";
import Headline from "./headline";

export default {
  title: "Headline",
  component: Headline,
};

export const StartScreen = () => (
  <Headline>
    <h1>Willkommen bei Platzhalter.io!</h1>
  </Headline>
);
