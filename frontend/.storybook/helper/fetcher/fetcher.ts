import { ShopConfig } from "../../../src/service/domain";

const shop: ShopConfig = {
  address: "Am Bahnhofsplatz, 94032 Passau",
  "@id": "/shop/default",
  mail: "someone@example.org",
  name: "Buchhandlung Pustet",
  needsRegistration: true,
};

export const fetcher = async (url: string) => {
  console.log("fetching", { url });
  if (/\/shop\/([^/]+?)\/?$/.test(url)) {
    return shop;
  }
  if (/\/shop\/([^/]+?)\/timeslot\/?$/.test(url)) {
    return [];
  }
  if (/\/shop\/([^/]+?)\/ticket\/?$/.test(url)) {
    return [];
  }
  return [];
};
