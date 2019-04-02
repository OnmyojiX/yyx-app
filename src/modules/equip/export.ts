import { HttpClient } from "../http";

export function exportJson(filename: string, value: any) {
  return HttpClient.post<string>("/api/export/json", value, {
    params: {
      filename
    }
  }).then(res => res.data);
}
