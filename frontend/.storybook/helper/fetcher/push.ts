import {
  Ticket,
  ShopId,
  Customer,
  RegisteredTicket,
} from "../../../src/service/domain";

export const putData = async (url: string, data: any) => {
  console.log("putting (mock)", { url, data });
};
export const postData = async (url: string, data: any) => {
  console.log("posting (mock)", { url, data });
};
export const updateShop = async () => {};
export const updateOpeningHours = async () => {};

export async function registerTicket(
  shopId: ShopId,
  ticket: Ticket,
  customer?: Customer
): Promise<RegisteredTicket> {
  return { ...ticket, ticketUrl: `/shop/${shopId}/ticket/1` };
}
