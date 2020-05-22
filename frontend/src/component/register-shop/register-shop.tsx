import React, { useCallback, useEffect } from "react";
import { useForm, FormContext } from "react-hook-form";

import Button from "../button/button";
import Checkbox from "../checkbox/checkbox";
import TextField from "../text-field/text-field";

import styles from "./register-shop.module.css";
import Spacer from "../spacer/spacer";
import { ShopConfig } from "../../service/domain";

interface RegisterShopProps {
  onRegister: (newShop: ShopConfig) => void;
  shop?: ShopConfig;
}

const RegisterShop: React.FC<RegisterShopProps> = ({ onRegister, shop }) => {
  const methods = useForm({ defaultValues: shop });
  const handleSubmit = useCallback(
    (values) => {
      onRegister(values);
    },
    [onRegister]
  );
  useEffect(() => {
    console.log("errors", methods.errors);
  }, [methods]);
  return (
    <div className={styles.root}>
      <h2>Lege Dein Geschäft auf Platzhalter.io an</h2>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <FormContext {...methods}>
          <div className={styles.fields}>
            <TextField name="name" label="Name deines Geschäfts" required />
            <Spacer />
            <TextField
              name="streetAddress"
              label="Straße, Hausnummer"
              required
            />
            <Spacer />
            <div className={styles.postal}>
              <TextField name="postalCode" label="PLZ" required />
              <TextField name="city" label="Ort" required />
            </div>
            <Spacer />
            <TextField name="mail" label="E-Mail" required />
            <Spacer />
            <Checkbox
              name="needsRegistration"
              label="Das Geschäft unterliegt der Aufzeichnungspflicht, um im Falle einer Infektion Kontaktpersonen ausfindig machen zu können."
            />
            <Spacer />
            <Button type="submit">Lege Deine Öffnungszeiten fest</Button>
          </div>
        </FormContext>
      </form>
    </div>
  );
};

export default RegisterShop;
