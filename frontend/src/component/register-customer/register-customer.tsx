import React, { useCallback, useEffect } from "react";
import { useForm, FormContext } from "react-hook-form";

import Button from "../button/button";
import TextField from "../text-field/text-field";

import styles from "./register-customer.module.css";
import Spacer from "../spacer/spacer";
import { Customer, Ticket } from "../../service/domain";
import { push } from "../../../.storybook/helper/fetcher/connection";
import { useHistory, useRouteMatch } from "react-router-dom";

interface RegisterCustomerProps {
  onRegister: (customer: Customer) => void;
  ticket?: Ticket;
}

const RegisterCustomer: React.FC<RegisterCustomerProps> = ({
  onRegister,
  ticket,
}) => {
  const methods = useForm();
  const { push } = useHistory();
  const match = useRouteMatch();
  const handleSubmit = useCallback(
    (values) => {
      const customer: Customer = {
        address: `${values.streetAddress}, ${values.postalCode} ${values.city}`,
        name: values.name,
        phone: values.phone,
      };
      onRegister(customer);
    },
    [onRegister]
  );
  useEffect(() => {
    console.log(methods.errors);
    if (!ticket) {
      push(`${match.path}/..`);
    }
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
            <Spacer />
            <TextField name="name" label="Vor / Nachname" required />
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
            <TextField name="phone" label="Telefonnummer" required />
            <Spacer />
            <Button type="submit">Ticketbuchung abschließen</Button>
          </div>
        </FormContext>
      </form>
    </div>
  );
};

export default RegisterCustomer;
