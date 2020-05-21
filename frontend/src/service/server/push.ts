import {
  ShopId,
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
  shopId: ShopId,
  data: Timeslot[]
): Promise<void> {
  await putData(`${shopId}/timeslot/`, data);
}

export async function registerTicket(
  shopId: ShopId,
  ticket: AvailableSlot,
  customer?: Customer
): Promise<RegisteredTicket> {
  const res = await postData(`${shopId}/ticket/`, { customer, ticket });
  const ticketUrl = res.headers.location;
  return { ...ticket, ticketUrl };
}
