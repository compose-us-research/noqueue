export interface Customer {
  name: Name;
  address: Address;
  phone: Phone;
}

export type Day = "Mo" | "Di" | "Mi" | "Do" | "Fr" | "Sa" | "So";

export type Address = Flavor<string, "Address">;
export type AmountOfPeople = Flavor<number, "AmountOfPeople">;
export type EMail = Flavor<string, "EMail">;
export type Minutes = Flavor<number, "Minutes">;
export type Name = Flavor<string, "Name">;
export type Phone = Flavor<string, "Phone">;
export type ShopId = Flavor<string, "ShopId">;
export type ShopName = Flavor<string, "ShopName">;
export type Slug = Flavor<string, "Slug">;
export type Time = Flavor<string, "Time">;
export type TimeslotId = Flavor<string, "TimeslotId">;

export interface BaseShopConfig {
  address: Address;
  mail: EMail;
  maxDuration: Minutes;
  name: ShopName;
  needsRegistration: boolean;
}

export interface UpdateShopConfig extends BaseShopConfig {
  "@id": ShopId;
}

export interface ShopConfig extends BaseShopConfig, UpdateShopConfig {}

export interface Timerange {
  amountOfPeopleInShop: AmountOfPeople;
  days: [boolean, boolean, boolean, boolean, boolean, boolean, boolean];
  id: string;
  timeFrom: Time;
  timeUntil: Time;
  timeframeFrom: Minutes;
  timeframeTo: Minutes;
}

export interface Timeslot {
  id: number;
  from: Date;
  to: Date;
}

export interface OpeningHourSlot {
  start: Date;
  end: Date;
  customers: AmountOfPeople;
  durationMax: Minutes;
  durationMin: Minutes;
}
