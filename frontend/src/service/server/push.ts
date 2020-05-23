import {
  ShopConfig,
  UpdateShopConfig,
  Customer,
  RegisteredTicket,
  Timeslot,
  AvailableSlot,
} from "../domain";

export const putData = (url: string, data: any) => sendData("PUT", url, data);
export const postData = (url: string, data: any) => sendData("POST", url, data);

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
    throw Error("could not update");
  }
  return res;
}

export async function updateShop(data: UpdateShopConfig): Promise<void> {
  console.log("fetching", { data });
  await putData(data["@id"], data);
}

export async function updateOpeningHours(
  shop: ShopConfig,
  data: Timeslot[]
): Promise<void> {
  await putData(`${shop["@id"]}/timeslot/`, data);
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
}: RegisterTicketParams): Promise<RegisteredTicket> {
  const res = await postData(`${shop["@id"]}/ticket/`, { customer, ticket });
  const ticketUrl = res.headers.get("location");
  const registeredTicket = { ...ticket, id: ticketUrl, ticketUrl, shop };
  console.log({ registeredTicket });
  return registeredTicket;
}
