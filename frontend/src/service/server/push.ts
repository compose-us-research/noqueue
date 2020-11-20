import {
  AvailableSlot,
  Customer,
  LocalTicket,
  ShopConfig,
  Timeslot,
  UpdateShopConfig,
  Dayslot,
} from "../domain";
import { fetcher } from "./fetcher";
import { toRegisteredTicket } from "../tickets/use-local-tickets";
import HttpRequestError from "../error/http-request-error";
import NotFoundError from "../error/not-found-error";

export const putData = (url: string, data: any) => sendData("PUT", url, data);
export const postData = (url: string, data: any) => sendData("POST", url, data);

async function deleteUrl(url: string): Promise<any> {
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    if (res.status === 404) {
      throw new NotFoundError("DELETE", url);
    }
    throw new HttpRequestError("DELETE", url, res.status, res.statusText);
  }
  return res;
}

async function sendData(method: string, url: string, data: any): Promise<any> {
  const res = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new HttpRequestError(method, url, res.status, res.statusText);
  }
  return res;
}

export async function updateShop(data: UpdateShopConfig): Promise<void> {
  await putData(data["@id"], data);
}

export async function updateOpeningHours(
  shop: ShopConfig,
  timeslots: Timeslot[]
): Promise<void> {
  await putData(`${shop["@id"]}/timeslot/`, { member: timeslots });
}

export async function updateOpeningDays(
  shop: ShopConfig,
  dayslots: Dayslot[]
): Promise<void> {
  await putData(`${shop["@id"]}/dayslot/`, { member: dayslots });
}

export type RegisterTicketParams = {
  shop: ShopConfig;
  ticket: AvailableSlot;
  customer?: Customer;
};

export async function registerTicket({
  shop,
  ticket,
  customer,
}: RegisterTicketParams): Promise<LocalTicket> {
  const dataToPost = { ...ticket, contact: customer };
  const res = await postData(`${shop["@id"]}/ticket/`, dataToPost);
  const ticketUrl = res.headers.get("location");
  const fetchedTicket = await fetcher!(ticketUrl);
  const registeredTicket = toRegisteredTicket(fetchedTicket);
  return { ...dataToPost, ...registeredTicket, ticketUrl, shop };
}

export interface RemoveTicketParams {
  ticketUrl: string;
}

export async function removeTicket({
  ticketUrl,
}: RemoveTicketParams): Promise<void> {
  return await deleteUrl(ticketUrl);
}
