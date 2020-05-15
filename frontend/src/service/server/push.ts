import { UpdateShopConfig } from "../domain";

export async function updateShop(data: UpdateShopConfig): Promise<void> {
  console.log("fetching", { data });
  await fetch(data["@id"], {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
