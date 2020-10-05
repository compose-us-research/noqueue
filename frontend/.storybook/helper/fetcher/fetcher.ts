import { startOfDay, endOfDay } from "date-fns";
import { ShopConfig } from "../../../src/service/domain";
import { fetcherFn } from "swr/dist/types";

const featureFestival: ShopConfig = {
  address: {
    streetAddress: "Auf der Wiese 17",
    postalCode: "94032",
    city: "Passau",
  },
  "@id": "/shop/feature-festival",
  mail: "someone@example.org",
  maxDuration: 5,
  minDuration: 3,
  name: "Feature Festival",
  needsRegistration: true,
  path: "feature-festival",
  slotType: "holidays",
};

const lovelyLandmark: ShopConfig = {
  address: {
    streetAddress: "Am Bahnhofsplatz 1",
    postalCode: "94032",
    city: "Passau",
  },
  "@id": "/shop/lovely-landmark",
  mail: "someone@example.org",
  maxDuration: 28,
  minDuration: 1,
  name: "Lovely Landmark",
  needsRegistration: true,
  path: "lovely-landmark",
  slotType: "days",
};

const shop: ShopConfig = {
  address: {
    streetAddress: "Am Bahnhofsplatz 1",
    postalCode: "94032",
    city: "Passau",
  },
  "@id": "/shop/cozy-costumes",
  mail: "someone@example.org",
  maxDuration: 120,
  minDuration: 15,
  name: "Cozy Costumes",
  needsRegistration: true,
  path: "cozy-costumes",
  slotType: "times",
};

export const fetcher: fetcherFn<any> = async (url: string) => {
  console.log("fetching", { url });
  if (/\/shop\/lovely-landmark\/?$/.test(url)) {
    return lovelyLandmark;
  }
  if (/\/shop\/feature-festival\/?$/.test(url)) {
    return featureFestival;
  }
  if (/\/shop\/([^/]+?)\/?$/.test(url)) {
    return shop;
  }
  if (/\/shop\/([^/]+?)\/dayslot\/?$/.test(url)) {
    const now = new Date();
    return {
      member: [
        {
          id: 13,
          customers: 4,
          end: startOfDay(new Date(+now + 5 * 24 * 60 * 60 * 1000)),
          minDuration: 1,
          maxDuration: 3,
          start: startOfDay(now),
        },
      ],
    };
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
  if (/\/shop\/cozy-costumes\/ticket\/available/.test(url)) {
    const now = new Date();
    return {
      member: [
        {
          start: startOfDay(now),
          end: endOfDay(now),
          reserved: 0,
          allowed: 4,
          available: 4,
        },
        {
          start: startOfDay(+now + 24 * 60 * 60 * 1000),
          end: endOfDay(+now + 24 * 60 * 60 * 1000),
          reserved: 0,
          allowed: 4,
          available: 4,
        },
        {
          start: startOfDay(+now + 2 * 24 * 60 * 60 * 1000),
          end: endOfDay(+now + 2 * 24 * 60 * 60 * 1000),
          reserved: 0,
          allowed: 4,
          available: 4,
        },
        {
          start: startOfDay(+now + 3 * 24 * 60 * 60 * 1000),
          end: endOfDay(+now + 3 * 24 * 60 * 60 * 1000),
          reserved: 0,
          allowed: 4,
          available: 4,
        },
        {
          start: startOfDay(+now + 4 * 24 * 60 * 60 * 1000),
          end: endOfDay(+now + 4 * 24 * 60 * 60 * 1000),
          reserved: 0,
          allowed: 4,
          available: 4,
        },
      ],
    };
  }
  if (/\/shop\/([^/]+?)\/ticket\/available/.test(url)) {
    const now = new Date();
    return {
      member: [
        {
          start: startOfDay(now),
          end: endOfDay(now),
          reserved: 0,
          allowed: 4,
          available: 4,
        },
      ],
    };
  }
  return [];
};
