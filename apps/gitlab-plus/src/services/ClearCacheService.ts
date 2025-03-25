import { CacheHelper } from '@store/CacheHelper';

import { AppConfig } from '../consts/AppConfig';
import { ServiceName } from '../consts/ServiceName';
import { BaseService } from './BaseService';

export class ClearCacheService extends BaseService {
  public name = ServiceName.ClearCacheService;

  public init() {
    this.invalidateCache();
    window.setInterval(this.invalidateCache.bind(this), 60 * 1000);
  }

  private invalidateCache(): void {
    CacheHelper.clearInvalid(AppConfig.CachePrefix);
  }
}
