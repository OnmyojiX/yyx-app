import moment from "moment";

export type Sorter<T> = (a: T, b: T) => number;
export type Filter<T> = (v: T) => boolean;

export function combineSorters<T>(...sorters: Array<Sorter<T>>): Sorter<T> {
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

export function combineFilters<T>(...filters: Array<Filter<T>>): Filter<T> {
  return v => {
    for (let filter of filters) {
      const r = filter(v);
      if (!r) {
        return false;
      }
    }
    return true;
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

const DATE_FORMAT = "YYYY-MM-DD HH:mm";

export function formatTimestamp(v?: number) {
  if (!v) return "很久以前";
  return moment(new Date().setTime(v * 1000))
    .local()
    .format(DATE_FORMAT);
}

export function getTimestampFromObjectId(id: string) {
  return parseInt(id.substring(0, 8), 16);
}

export function formatDate(date: string | Date, format = DATE_FORMAT) {
  return moment(date)
    .local()
    .format(format);
}

export function formatUtcDate(date: string, format = DATE_FORMAT) {
  return moment
    .utc(date)
    .local()
    .format(format);
}

export function parseDate(str: string, locale?: string) {
  return moment(str, DATE_FORMAT).toDate();
}

export function computeOnce<T>(f: () => T): () => T {
  let value: T | null = null;
  return () => {
    if (!value) {
      value = f();
    }
    return value;
  };
}

export function formatCurrency(v: number | string, sign = "¥") {
  if (typeof v === "string") {
    v = parseFloat(v);
  }
  return sign + v.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, `$&,`);
}
