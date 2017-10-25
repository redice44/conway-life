export default class Environment<T> {
  protected width: number;
  protected height: number;
  protected size: number;
  protected cells: T[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.size = this.width * this.height;
    this.cells = [];
  }

  protected initializeCells() {
    throw new Error('Override Me');
  }

  public next() {
    throw new Error('Override Me');
  }
}