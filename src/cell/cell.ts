export default class Cell<T> {
  protected index: number;
  protected node: T;

  constructor(index: number, node: T) {
    this.index = index;
    this.node = node;
  }

  public getIndex(): number {
    return this.index;
  }
}