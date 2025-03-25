import { CacheItem } from './Cache';
import { Store } from './Store';

export class CacheHelper {
  static clearInvalid(prefix: string) {
    for (const key in localStorage) {
      if (!key.startsWith(prefix)) {
        continue;
      }

      const item = new Store<CacheItem>(key).get();
      if (!this.isCacheEntity(item)) {
        continue;
      }

      if (!this.isValid(item)) {
        new Store<CacheItem>(key).remove();
      }
    }
  }

  static expirationDate(minutes: 'lifetime' | number) {
    if (typeof minutes === 'string') {
      return minutes;
    }
    const time = new Date();
    time.setMinutes(time.getMinutes() + minutes);
    return time;
  }

  static isCacheEntity(item?: CacheItem): item is CacheItem {
    return !!item && typeof item === 'object' && 'expirationDate' in item;
  }

  static isValid(item?: CacheItem): item is CacheItem {
    if (item) {
      return (
        item.expirationDate === 'lifetime' ||
        new Date(item.expirationDate) > new Date()
      );
    }

    return false;
  }
}
