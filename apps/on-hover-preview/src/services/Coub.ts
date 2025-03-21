import { ServiceFactory } from './base/ServiceFactory';

export class Coub extends ServiceFactory {
  constructor() {
    super({
      embedUrl: 'https://coub.com/embed/:id',
      pattern: /coub\.com\/view\/(?<id>[^/]+)\/?/,
      queryParams: {
        autostart: 'true',
        muted: 'false',
        originalSize: 'false',
        startWithHD: 'true',
      },
    });
  }
}
