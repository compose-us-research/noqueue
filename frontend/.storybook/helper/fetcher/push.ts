import { LocalTicket } from "../../../src/service/domain";
import { RegisterTicketParams } from "../../../src/service/server/push";

export const putData = async (url: string, data: any) => {
  console.log("putting (mock)", { url, data });
};
export const postData = async (url: string, data: any) => {
  console.log("posting (mock)", { url, data });
};
export const updateShop = async () => {};
export const updateOpeningHours = async () => {};

export async function registerTicket({
  shop,
  ticket,
  customer,
}: RegisterTicketParams): Promise<LocalTicket> {
  const ticketUrl = `${shop["@id"]}/ticket/1`;
  return { ...ticket, shop, id: ticketUrl, ticketUrl };
}
