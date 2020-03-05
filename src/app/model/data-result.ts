export class DataResult {
  total: number;
  data: any[];

  constructor(item = {total: 0, data: []}) {
    Object.assign(this, item);
  }
}
