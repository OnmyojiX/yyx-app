import DATA from "./SERVER_DATA.json";

const map = new Map<number, string>(
  DATA.map(item => {
    return [parseInt(item.id), item.name] as [number, string];
  })
);

export function getServerName(id: number): string {
  return map.get(id) || "未知服务器";
}
