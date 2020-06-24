import HttpRequestError from "./http-request-error";

export default class NotFoundError extends HttpRequestError {
  constructor(public method: string, public url: string) {
    super(method, url, 404, "Not found");
  }
}
