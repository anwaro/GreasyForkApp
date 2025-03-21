import { ServiceFactory } from './base/ServiceFactory';

export class Ted extends ServiceFactory {
  constructor() {
    super({
      embedUrl: 'https://embed.ted.com/talks/:id',
      pattern: /ted\.com\/talks\/(?<id>[^/]+)\/?/,
    });
  }
}
