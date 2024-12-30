import { Cache } from '@store/Cache';

import { Service } from '../types/Service';

export class ClearCacheService extends Service {
  private cache = new Cache('glp-');

  constructor() {
    super();
  }

  public init() {
    this.cache.clearInvalid();
    window.setInterval(this.cache.clearInvalid.bind(this.cache), 60 * 1000);
  }
}
