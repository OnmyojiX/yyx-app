import { HttpClient } from "../http";

export const pullCbg = (url: string) => {
  return HttpClient.put("/api/snapshot-cbg", {
    url
  }).then(res => res.data);
};
