export interface TableProps<T> {
  headers: (keyof T)[];
  rows: T[];
  idKey: keyof T;
}