export type Amount = Flavor<number, "Amount">;

export interface Customer {
  name: string;
  address: string;
  phone: string;
}

export type Day = "Mo" | "Di" | "Mi" | "Do" | "Fr" | "Sa" | "So";

export type Minutes = Flavor<number, "Minutes">;

export interface RegisteredShop extends Shop {
  "@id": string;
  icon: JSX.Element;
  ranges: Timerange[];
}

export interface Shop {
  address: string;
  name: string;
  needsRegistration: boolean;
}

export type Time = Flavor<string, "Time">;

export interface Timerange {
  amountOfPeopleInShop: Amount;
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
