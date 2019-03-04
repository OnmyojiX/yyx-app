import { format } from "date-fns";

export type Sorter<T> = (a: T, b: T) => number;

export function composeSorters<T>(...sorters: Array<Sorter<T>>): Sorter<T> {
  return (a, b) => {
    for (let sorter of sorters) {
      const r = sorter(a, b);
      if (r !== 0) {
        return r;
      }
    }
    return 0;
  };
}

export function sortDesc<T>(sorter: Sorter<T>): Sorter<T> {
  return (a, b) => -sorter(a, b);
}

export enum AttrValueType {
  Float,
  Percentage
}

export function formatAttrValue(
  v: number,
  type: AttrValueType = AttrValueType.Float
): string {
  switch (type) {
    case AttrValueType.Float:
      return v.toFixed(2);
    case AttrValueType.Percentage:
      return `${(Math.round(v * 10000) / 100).toFixed(2)}%`;
  }
}

export function formatTimestamp(v: number) {
  if (!v) return "很久以前";
  return format(new Date().setTime(v * 1000), "YYYY-MM-DD HH:mm");
}
