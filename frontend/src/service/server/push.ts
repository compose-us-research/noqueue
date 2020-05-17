import {
  OpeningHourSlot,
  ShopId,
  UpdateShopConfig,
  Timeslot,
  Customer,
} from "../domain";

export async function putData(url: string, data: any): Promise<void> {
  const res = await fetch(url, {
    method: "PUT",
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
  slot: Timeslot,
  customer?: Customer
): Promise<void> {
  await putData(`/shop/${shopId}/ticket/${slot.id}`, customer);
}
