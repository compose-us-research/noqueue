import { ShopConfig } from "../../../src/service/domain";
import { fetcherFn } from "swr/dist/types";

const shop: ShopConfig = {
  address: {
    streetAddress: "Am Bahnhofsplatz 1",
    postalCode: "94032",
    city: "Passau",
  },
  "@id": "/shop/buchhandlung-pustet",
  mail: "someone@example.org",
  maxDuration: 120,
  minDuration: 15,
  name: "Buchhandlung Pustet",
  needsRegistration: true,
  path: "buchhandlung-pustet",
};

export const fetcher: fetcherFn<any> = async (url: string) => {
  console.log("fetching", { url });
  if (/\/shop\/([^/]+?)\/?$/.test(url)) {
    return shop;
  }
  if (/\/shop\/([^/]+?)\/timeslot\/?$/.test(url)) {
    return {
      member: [
        {
          day: 1,
          start: "16:30:00",
          end: "23:30:00",
          customers: 3,
          minDuration: 15,
          maxDuration: 60,
        },
        {
          day: 2,
          start: "16:30:00",
          end: "23:30:00",
          customers: 3,
          minDuration: 15,
          maxDuration: 60,
        },
        {
          day: 3,
          start: "16:30:00",
          end: "23:30:00",
          customers: 3,
          minDuration: 15,
          maxDuration: 60,
        },
        {
          day: 4,
          start: "16:30:00",
          end: "23:30:00",
          customers: 3,
          minDuration: 15,
          maxDuration: 60,
        },
        {
          day: 5,
          start: "16:30:00",
          end: "23:30:00",
          customers: 3,
          minDuration: 15,
          maxDuration: 60,
        },
      ],
    };
  }
  if (/\/shop\/([^/]+?)\/ticket\/?$/.test(url)) {
    return { member: [] };
  }
  return [];
};
