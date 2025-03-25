import { CacheHelper } from './CacheHelper';
import { Store } from './Store';

export type CacheItem = {
  expirationDate: 'lifetime' | Date;
  value: unknown;
};

export class Cache {
  constructor(public prefix: string) {}

  get<T>(key: string, defaultValue: T): T;
  get<T>(key: string): T | undefined;
  get<T>(key: string, defaultValue?: T): T | undefined {
    const data = new Store<CacheItem>(this.createKey(key)).get();
    if (CacheHelper.isValid(data)) {
      return data.value as T;
    }

    return defaultValue;
  }

  set<T>(key: string, value: T, minutes: 'lifetime' | number) {
    new Store(this.createKey(key)).set({
      expirationDate: CacheHelper.expirationDate(minutes),
      value,
    });
  }

  private createKey(key: string) {
    return `${this.prefix}${key}`;
  }
}
