import React from "react";

import styles from "./stub.module.css";
import Button from "../button/button";
import Spacer from "../spacer/spacer";
import Headline from "../headline/headline";

interface StubProps {
  buttonText?: string;
  next: () => void;
  children?: React.ReactNode;
}

const Stub: React.FC<StubProps> = ({
  buttonText = "Zurück",
  next,
  children = undefined,
}) => {
  return (
    <div className={styles.root}>
      <Headline>
        <h1>Sorry!</h1>
      </Headline>

      <div className={styles.main}>
        <Spacer />

        <p>Feature in progress.</p>

        {children}

        <Spacer />

        <Button className={styles.button} variant="secondary" onClick={next}>
          <span>{buttonText}</span>
        </Button>
      </div>
    </div>
  );
};

export default Stub;
