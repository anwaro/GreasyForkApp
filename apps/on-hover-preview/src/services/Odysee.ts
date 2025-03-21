import { ServiceFactory } from './base/ServiceFactory';

// @TODO handle link without username e.g.
// https://odysee.com/portugal-wildfires-smoke/12649b46ce063b40252f86bd2469e1c40eb2fe99
export class Odysee extends ServiceFactory {
  constructor() {
    super({
      embedUrl: 'https://odysee.com/$/embed:pathname',
      pattern: /odysee\.com\/@/,
      queryParams: {
        autoplay: 'true',
      },
    });
  }
}
