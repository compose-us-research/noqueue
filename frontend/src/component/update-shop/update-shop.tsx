import React, { useCallback, useEffect } from "react";
import { useForm, FormContext } from "react-hook-form";

import { ShopConfig } from "../../service/domain";
import Button from "../button/button";
import Checkbox from "../checkbox/checkbox";
import Spacer from "../spacer/spacer";
import TextField from "../text-field/text-field";

import styles from "./update-shop.module.css";

interface UpdateShopProps {
  onSave: (newShop: ShopConfig) => void;
  shop?: ShopConfig;
}

const UpdateShop: React.FC<UpdateShopProps> = ({ onSave, shop }) => {
  console.log("updateshop", JSON.stringify(shop));
  const methods = useForm({ defaultValues: shop });
  const handleSubmit = useCallback(
    (values) => {
      onSave(values);
    },
    [onSave]
  );
  useEffect(() => {
    console.log("errors", methods.errors);
  }, [methods]);
  return (
    <div className={styles.root}>
      <h2>Bearbeite Dein Geschäft auf Platzhalter.io</h2>
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

export default UpdateShop;
