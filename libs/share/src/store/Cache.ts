type CacheItem = {
  expirationDate: 'lifetime' | Date;
  value: unknown;
};

export class Cache {
  constructor(public prefix: string) {}

  clearInvalid() {
    for (const key in localStorage) {
      if (key.startsWith(this.prefix) && !this.isValid(this.getItem(key))) {
        localStorage.removeItem(key);
      }
    }
  }

  expirationDate(minutes: 'lifetime' | number) {
    if (typeof minutes === 'string') {
      return minutes;
    }
    const time = new Date();
    time.setMinutes(time.getMinutes() + minutes);
    return time;
  }

  get<T>(key: string): T | undefined {
    try {
      const data = this.getItem(this.key(key));
      if (this.isValid(data)) {
        return data.value as T;
      }
    } catch (e) {
      return undefined;
    }
    return undefined;
  }

  key(key: string) {
    return `${this.prefix}${key}`;
  }

  set<T>(key: string, value: T, minutes: 'lifetime' | number) {
    localStorage.setItem(
      this.key(key),
      JSON.stringify({
        expirationDate: this.expirationDate(minutes),
        value,
      })
    );
  }

  private getItem(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch (e) {
      return undefined;
    }
  }

  private isValid(item?: CacheItem): item is CacheItem {
    if (item) {
      return (
        item.expirationDate === 'lifetime' ||
        new Date(item.expirationDate) > new Date()
      );
    }

    return false;
  }
}
