import { Service } from '../types/Service';
import { Cache } from '@store/Cache';

export class ClearCacheService extends Service {
  private cache = new Cache('glp-');

  public init() {
    this.cache.clearInvalid();
    window.setInterval(this.cache.clearInvalid.bind(this.cache), 60 * 1000);
  }
}
