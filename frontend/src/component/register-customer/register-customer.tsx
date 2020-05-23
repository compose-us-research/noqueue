import React, { useCallback, useEffect } from "react";
import { useForm, FormContext } from "react-hook-form";

import Button from "../button/button";
import TextField from "../text-field/text-field";

import styles from "./register-customer.module.css";
import Spacer from "../spacer/spacer";
import { Customer, Ticket, AvailableSlot } from "../../service/domain";
import { useHistory, useRouteMatch } from "react-router-dom";
import useLocalTickets from "../../service/tickets/use-local-tickets";

interface RegisterCustomerProps {
  onRegister: (customer: Customer) => void;
  ticket: AvailableSlot;
}

const RegisterCustomer: React.FC<RegisterCustomerProps> = ({
  onRegister,
  ticket,
}) => {
  const { push } = useHistory();
  const { customer, tickets } = useLocalTickets();
  const match = useRouteMatch();
  const methods = useForm({ defaultValues: customer });
  const { errors, watch } = methods;
  const handleSubmit = useCallback(
    (values) => {
      console.log("submitting customer", { values });
      const valueAddress = values?.contact?.address;
      const address =
        (valueAddress?.streetAddress &&
          valueAddress?.postalCode &&
          valueAddress?.city &&
          valueAddress) ||
        undefined;
      const email = values?.contact?.email || undefined;
      const phone = values?.contact?.phone || undefined;
      const customer: Customer = {
        contact: {
          address,
          email,
          phone,
        },
        name: values.name,
      };
      onRegister(customer);
    },
    [onRegister]
  );
  const validate = () => {
    const hasAddress = !!(
      watch("contact.address.streetAddress") &&
      watch("contact.address.postalCode") &&
      watch("contact.address.city")
    );
    const hasEMail = !!watch("contact.email");
    const hasPhone = !!watch("contact.phone");
    console.log({
      hasAddress,
      hasEMail,
      hasPhone,
      email: watch("contact.email"),
    });
    return (
      hasAddress ||
      hasEMail ||
      hasPhone ||
      "Mindestens eine Kontaktmöglichkeit wird benötigt (Telefon, E-Mail oder Adresse)"
    );
  };
  useEffect(() => {
    console.log({ errors });
    if (!ticket) {
      push(`${match.path}/..`);
    }
  }, [errors]);
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
              name="contact.email"
              label="E-Mail"
              validate={validate}
            />
            <Spacer />
            <TextField
              name="contact.address.streetAddress"
              label="Straße, Hausnummer"
              validate={validate}
            />
            <Spacer />
            <div className={styles.postal}>
              <TextField
                name="contact.address.postalCode"
                label="PLZ"
                validate={validate}
              />
              <TextField
                name="contact.address.city"
                label="Ort"
                validate={validate}
              />
            </div>
            <Spacer />
            <TextField
              name="contact.phone"
              label="Telefonnummer"
              validate={validate}
            />
            <Spacer />
            {errors &&
              Object.values(errors).map((error, index) => (
                <li key={index}>{JSON.stringify(Object.keys(error))}</li>
              ))}
            <Button type="submit">Ticketbuchung abschließen</Button>
          </div>
        </FormContext>
      </form>
    </div>
  );
};

export default RegisterCustomer;
