import { Cache } from '@store/Cache';

import { AppConfig } from '../consts/AppConfig';

type Item = {
  id: number | string;
};

export class RecentlyProvider<T extends Item> {
  cache = new Cache(AppConfig.CachePrefix);
  readonly key: string;
  private readonly eventName: string;

  constructor(key: string) {
    this.key = `recently-${key}`;
    this.eventName = `recently-${key}-change`;
  }

  add(...items: T[]) {
    const itemsId = items.map((i) => i.id);
    this.cache.set(
      this.key,
      [...items, ...this.get().filter((el) => !itemsId.includes(el.id))],
      'lifetime'
    );
    this.triggerChange();
  }

  get() {
    return this.cache.get<T[]>(this.key) || [];
  }

  onChange(callback: () => void) {
    document.addEventListener(this.eventName, callback);
  }

  remove(...items: T[]) {
    const itemsId = items.map((i) => i.id);
    this.cache.set(
      this.key,
      this.get().filter((el) => !itemsId.includes(el.id)),
      'lifetime'
    );
    this.triggerChange();
  }

  private triggerChange() {
    document.dispatchEvent(new CustomEvent(this.eventName));
  }
}
