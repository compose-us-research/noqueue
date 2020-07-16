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
  if (/\/shop\/([^/]+?)\/ticket\/available/.test(url)) {
    return {
      member: [
        {
          start: "2020-07-13T00:00:00.000Z",
          end: "2020-07-13T23:59:00.000Z",
          reserved: 0,
          allowed: 4,
          available: 4,
        },
        {
          start: "2020-07-14T00:00:00.000Z",
          end: "2020-07-14T23:59:00.000Z",
          reserved: 0,
          allowed: 4,
          available: 4,
        },
        {
          start: "2020-07-15T00:00:00.000Z",
          end: "2020-07-15T23:59:00.000Z",
          reserved: 0,
          allowed: 4,
          available: 4,
        },
        {
          start: "2020-07-16T00:00:00.000Z",
          end: "2020-07-16T23:59:00.000Z",
          reserved: 0,
          allowed: 4,
          available: 4,
        },
        {
          start: "2020-07-17T00:00:00.000Z",
          end: "2020-07-17T23:59:00.000Z",
          reserved: 0,
          allowed: 4,
          available: 4,
        },
      ],
    };
  }
  return [];
};
