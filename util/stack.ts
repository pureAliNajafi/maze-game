export class Stack {
  private items: any[] = [];
  constructor() {}

  push(item: any) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
