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
