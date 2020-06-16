import {
  Customer,
  ContactAddress,
  ContactMail,
  ContactPhone,
  Address,
  EMail,
  Phone,
} from "../../service/domain";

export default function contactToString(customer: Customer): string {
  const phoneStr = (phone: Phone) => `Telefon ${phone}`;
  const emailStr = (email: EMail) => `E-Mail ${email}`;
  const addressStr = (address: Address) =>
    `Wohnort ${address.streetAddress}, ${address.postalCode} ${address.city}`;
  const contactAbilities: string[] = [];
  const { address, email, phone } = customer.contact as ContactAddress &
    ContactMail &
    ContactPhone;
  if (address) contactAbilities.push(addressStr(address));
  if (email) contactAbilities.push(emailStr(email));
  if (phone) contactAbilities.push(phoneStr(phone));
  return `${customer.name}, erreichbar über ${joinWithLast(
    " und ",
    contactAbilities
  )}`;
}

function joinWithLast(lastSeparator: string, strings: string[]): string {
  const hasMoreThanOne = strings.length > 1;
  if (hasMoreThanOne) {
    return `${strings.slice(0, strings.length - 1).join(", ")}${lastSeparator}${
      strings[strings.length - 1]
    }`;
  } else {
    return strings.join();
  }
}
