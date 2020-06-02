import { ShopId } from "../../service/domain";

export default function idToLink(id: ShopId) {
  return id.replace(/^https?:/, "");
}
