export interface Customer {
  name: Name;
  contact: ContactMail | ContactPhone | ContactAddress;
}

export interface ContactPhone {
  phone: Phone;
}

export interface ContactMail {
  email: EMail;
}

export interface ContactAddress {
  address: { city: City; postalCode: PostalCode; streetAddress: StreetAddress };
}

export type Day = "Mo" | "Di" | "Mi" | "Do" | "Fr" | "Sa" | "So";

export type AmountOfPeople = Flavor<number, "AmountOfPeople">;
export type City = Flavor<string, "City">;
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type EMail = Flavor<string, "EMail">;
export type Minutes = Flavor<number, "Minutes">;
export type Name = Flavor<string, "Name">;
export type Phone = Flavor<string, "Phone">;
export type PostalCode = Flavor<string, "PostalCode">;
export type ShopId = Flavor<string, "ShopId">;
export type ShopName = Flavor<string, "ShopName">;
export type StreetAddress = Flavor<string, "StreetAddress">;
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

export interface Ticket {
  allowed: number;
  available: number;
  end: Date;
  reserved: number;
  start: Date;
}

export interface AvailableSlot {
  end: Date;
  start: Date;
}

export interface Timerange {
  amountOfPeopleInShop: AmountOfPeople;
  days: [boolean, boolean, boolean, boolean, boolean, boolean, boolean];
  start: Time;
  end: Time;
  minDuration: Minutes;
  maxDuration: Minutes;
}

export interface Timeslot {
  customers: AmountOfPeople;
  day: DayOfWeek;
  start: Time;
  end: Time;
}

export type TicketMap = { [id: string]: RegisteredTicket };

export interface RegisteredTicket {
  id: string;
  ticketUrl: string;
  shop: ShopConfig;
  start: Date;
  end: Date;
}
