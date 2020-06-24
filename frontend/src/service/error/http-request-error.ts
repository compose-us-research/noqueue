export default class HttpRequestError extends Error {
  constructor(
    public method: string,
    public url: string,
    public status: number,
    public message: string
  ) {
    super(`Konnte HTTP Request nicht ausführen: ${status} - ${message}`);
  }
}
