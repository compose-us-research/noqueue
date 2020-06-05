import React, { useCallback } from "react";
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
  const methods = useForm({ defaultValues: shop });
  const handleSubmit = useCallback(
    (values) => {
      onSave(values);
    },
    [onSave]
  );
  return (
    <div className={styles.root}>
      <h2>Bearbeite Dein Geschäft auf Platzhalter.io</h2>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <FormContext {...methods}>
          <div className={styles.fields}>
            <TextField
              name="name"
              label="Name deines Geschäfts"
              placeholder="Zum knuddeligen Kuscheltier"
              required
            />
            <Spacer />
            <TextField
              name="address.streetAddress"
              label="Straße, Hausnummer"
              placeholder="Blumenstr. 13"
              required
            />
            <Spacer />
            <div className={styles.postal}>
              <TextField
                name="address.postalCode"
                label="PLZ"
                placeholder="94032"
                required
              />
              <TextField
                name="address.city"
                label="Ort"
                placeholder="Passau"
                required
              />
            </div>
            <Spacer />
            <TextField
              name="mail"
              label="E-Mail"
              placeholder="betatester@platzhalter.io"
              required
            />
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
