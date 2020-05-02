export interface Customer {
  name: string;
  address: string;
  phone: string;
}

export interface Timeslot {
  id: number;
  from: Date;
  to: Date;
}

export interface Shop {
  "@id": string;
  address: string;
  name: string;
  needsRegistration: boolean;
}
