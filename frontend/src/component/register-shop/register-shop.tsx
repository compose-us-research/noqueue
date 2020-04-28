import React, { useCallback, useEffect } from "react";
import { useForm, FormContext } from "react-hook-form";

import Button from "../button/button";
import Checkbox from "../checkbox/checkbox";
import TextField from "../text-field/text-field";

import styles from "./register-shop.module.css";

interface RegisterShopProps {}

const RegisterShop: React.FC<RegisterShopProps> = () => {
  const methods = useForm();
  const handleSubmit = useCallback((values) => {
    console.log("submitting", { values });
  }, []);
  useEffect(() => {
    console.log(methods.errors);
  });
  return (
    <div className={styles.root}>
      <h2>Lege Dein Geschäft auf Platzhalter.io an</h2>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <FormContext {...methods}>
          <div className={styles.fields}>
            <TextField
              className={styles.regular}
              name="name"
              label="Name deines Geschäfts"
              required
            />
            <TextField
              className={styles.regular}
              name="streetAddress"
              label="Straße, Hausnummer"
              required
            />
            <TextField
              className={styles.half}
              name="postalCode"
              label="PLZ"
              required
            />
            <TextField
              className={styles.half}
              name="city"
              label="Ort"
              required
            />
            <TextField
              className={styles.regular}
              name="email"
              label="E-Mail"
              required
            />
            <Checkbox
              name="recordingNecessary"
              label="Das Geschäft unterliegt der Aufzeichnungspflicht, um im Falle einer Infektion Kontaktpersonen ausfindig machen zu können."
            />
            <Button type="submit">Lege Deine Öffnungszeiten fest</Button>
          </div>
        </FormContext>
      </form>
    </div>
  );
};

export default RegisterShop;
