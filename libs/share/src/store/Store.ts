export class Store<T> {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  get(defaultValue: T): T;

  get(): T | undefined;

  get(defaultValue: T | undefined = undefined): T | undefined {
    try {
      const data = localStorage.getItem(this.key);
      if (data) {
        return this.decode(data);
      }
      return defaultValue;
    } catch (_e) {
      return defaultValue;
    }
  }

  remove() {
    localStorage.removeItem(this.key);
  }

  set(value: T) {
    try {
      localStorage.setItem(this.key, this.encode(value));
    } catch (_e) {
      return;
    }
  }

  private decode<T>(val: string): T {
    return JSON.parse(val);
  }

  private encode<T>(val: T) {
    return JSON.stringify(val);
  }
}
