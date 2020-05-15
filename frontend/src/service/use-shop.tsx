import { ShopConfig } from "./domain";

const shop: ShopConfig = {
  address: "Am Bahnhofsplatz, 94032 Passau",
  "@id": "/shop/default",
  mail: "someone@example.org",
  name: "Buchhandlung Pustet",
  needsRegistration: true,
};

const useShop: () => ShopConfig = () => {
  return shop;
};

export default useShop;
