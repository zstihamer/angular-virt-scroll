export const PAGE_SIZE = 100;

export class PageState {
  skip: number;
  take: number;

  constructor(item: any = {skip: 0, take: 20}) {
    Object.assign(this, item);
  }

  public up(): void {
    const skip = this.skip - this.take;
    this.skip = skip > 0 ? skip : 0;
  }

  public down(total: number, reding = 0): void {
    const loaded = this.skip + this.take;
    const onServer = total - (loaded);
    this.take = onServer <= this.take ? onServer : this.take;
    this.skip = loaded > 0 ? loaded : 0;
  }
}
