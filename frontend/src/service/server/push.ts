import {
  OpeningHourSlot,
  ShopId,
  UpdateShopConfig,
  Customer,
  Ticket,
} from "../domain";

export const putData = (url: string, data: any) => sendData("PUT", url, data);
export const postData = (url: string, data: any) => sendData("POST", url, data);

async function sendData(method: string, url: string, data: any): Promise<void> {
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
}

export async function updateShop(data: UpdateShopConfig): Promise<void> {
  console.log("fetching", { data });
  await putData(data["@id"], data);
}

export async function updateOpeningHours(
  shopId: ShopId,
  data: OpeningHourSlot[]
): Promise<void> {
  await putData(`/shop/${shopId}/opening-hours/`, data);
}

export async function registerTicket(
  shopId: ShopId,
  ticket: Ticket,
  customer?: Customer
): Promise<void> {
  await postData(`/shop/${shopId}/ticket/`, { customer, ticket });
}
