import { Cache } from '@store/Cache';

type Item = {
  id: string | number;
};

export class RecentProvider<T extends Item> {
  private cache = new Cache('glp-');
  private readonly key: string;

  constructor(key: string) {
    this.key = `recent-${key}`;
  }

  get() {
    return this.cache.get<T[]>(this.key) || [];
  }

  add(...items: T[]) {
    const itemsId = items.map((i) => i.id);
    this.cache.set(
      this.key,
      [...items, ...this.get().filter((el) => !itemsId.includes(el.id))],
      'lifetime'
    );
  }

  remove(...items: T[]) {
    const itemsId = items.map((i) => i.id);
    this.cache.set(
      this.key,
      this.get().filter((el) => !itemsId.includes(el.id)),
      'lifetime'
    );
  }
}
