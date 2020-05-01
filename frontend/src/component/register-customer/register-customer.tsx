import React, { useCallback, useEffect } from "react";
import { useForm, FormContext } from "react-hook-form";

import Button from "../button/button";
import TextField from "../text-field/text-field";

import styles from "./register-customer.module.css";

interface RegisterCustomerProps {}

const RegisterCustomer: React.FC<RegisterCustomerProps> = () => {
  const methods = useForm();
  const handleSubmit = useCallback((values) => {
    console.log("submitting", { values });
  }, []);
  useEffect(() => {
    console.log(methods.errors);
  });
  return (
    <div className={styles.root}>
      <h2>Achtung!</h2>
      <h3>Das gewünschte Unternehmen unterliegt der Aufzeichnungspflicht.</h3>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <FormContext {...methods}>
          <div className={styles.fields}>
            <p>
              Um die Verbreitung des Corona-Virus weiter einzudämmen, müssen
              manche Unternehmen Aufzeichnungen darüber führen, wer zu welcher
              Uhrzeit in ihrem Geschäft war. Deine Kontaktdaten benötigen wir
              nur für den Fall, dass Kontaktpersonen ausfindig gemacht werden
              müssen. Sie werden nach 14 Tagen automatisch gelöscht.
            </p>
            <TextField name="name" label="Vor / Nachname" required />
            <TextField
              name="streetAddress"
              label="Straße, Hausnummer"
              required
            />
            <div className={styles.postal}>
              <TextField name="postalCode" label="PLZ" required />
              <TextField name="city" label="Ort" required />
            </div>
            <TextField name="phone" label="Telefonnummer" required />
            <Button type="submit">Tiecketbuchung abschließen</Button>
          </div>
        </FormContext>
      </form>
    </div>
  );
};

export default RegisterCustomer;
