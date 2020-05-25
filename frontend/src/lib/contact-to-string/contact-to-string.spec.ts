import { Customer } from "../../service/domain";
import contactToString from "./contact-to-string";

describe("contactToString", () => {
  const name = "Petra Platzhalter";
  const email = "betatester@platzhalter.io";
  const phone = "01234567890";
  const address = {
    city: "Passau",
    postalCode: "94032",
    streetAddress: "Am Bahnhofsplatz 7",
  };
  it("works with an address only", () => {
    const contact: Customer = {
      name,
      contact: {
        address,
      },
    };
    const result = contactToString(contact);
    expect(result).toEqual(
      "Petra Platzhalter, erreichbar über Wohnort Am Bahnhofsplatz 7, 94032 Passau"
    );
  });
  it("works with an email only", () => {
    const contact: Customer = {
      name,
      contact: {
        email,
      },
    };
    const result = contactToString(contact);
    expect(result).toEqual(
      "Petra Platzhalter, erreichbar über E-Mail betatester@platzhalter.io"
    );
  });
  it("works with a phone only", () => {
    const contact: Customer = {
      name,
      contact: {
        phone,
      },
    };
    const result = contactToString(contact);
    expect(result).toEqual(
      "Petra Platzhalter, erreichbar über Telefon 01234567890"
    );
  });
  it("works with address and mail", () => {
    const contact: Customer = {
      name,
      contact: {
        address,
        email,
      },
    };
    const result = contactToString(contact);
    expect(result).toEqual(
      "Petra Platzhalter, erreichbar über Wohnort Am Bahnhofsplatz 7, 94032 Passau und E-Mail betatester@platzhalter.io"
    );
  });
  it("works with address and phone", () => {
    const contact: Customer = {
      name,
      contact: {
        address,
        phone,
      },
    };
    const result = contactToString(contact);
    expect(result).toEqual(
      "Petra Platzhalter, erreichbar über Wohnort Am Bahnhofsplatz 7, 94032 Passau und Telefon 01234567890"
    );
  });
  it("works with mail and phone", () => {
    const contact: Customer = {
      name,
      contact: {
        email,
        phone,
      },
    };
    const result = contactToString(contact);
    expect(result).toEqual(
      "Petra Platzhalter, erreichbar über E-Mail betatester@platzhalter.io und Telefon 01234567890"
    );
  });
  it("works with address and mail and phone", () => {
    const contact: Customer = {
      name,
      contact: {
        address,
        email,
        phone,
      },
    };
    const result = contactToString(contact);
    expect(result).toEqual(
      "Petra Platzhalter, erreichbar über Wohnort Am Bahnhofsplatz 7, 94032 Passau, E-Mail betatester@platzhalter.io und Telefon 01234567890"
    );
  });
});
