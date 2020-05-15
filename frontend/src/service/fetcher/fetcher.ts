/**
 * Fetches data from the API server.
 * @param url The url to fetch
 * @returns A promise of the returned JSON.
 */
export const fetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
  // return new Promise<Timeslot[]>((resolve, reject) => {
  //   setTimeout(
  //     () =>
  //       resolve(
  //         [
  //           {
  //             id: 1,
  //             from: "2020-04-26Z15:30:00",
  //             to: "2020-04-26Z16:30:00",
  //           },
  //           {
  //             id: 2,
  //             from: "2020-04-26Z16:15:00",
  //             to: "2020-04-26Z16:30:00",
  //           },
  //         ].map((o) => ({ ...o, from: new Date(o.from), to: new Date(o.to) }))
  //       ),
  //     500
  //   );
  // });
};
