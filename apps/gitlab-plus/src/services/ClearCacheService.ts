import { Cache } from '@store/Cache';

import { BaseService } from './BaseService';
import { ServiceName } from './ServiceName';

export class ClearCacheService extends BaseService {
  name = ServiceName.ClearCacheService;

  private cache = new Cache('glp-');

  public init() {
    this.cache.clearInvalid();
    window.setInterval(this.cache.clearInvalid.bind(this.cache), 60 * 1000);
  }
}
