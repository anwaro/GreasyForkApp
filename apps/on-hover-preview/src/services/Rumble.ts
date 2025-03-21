import { ServiceFactory } from './base/ServiceFactory';

export class Rumble extends ServiceFactory {
  constructor() {
    super({
      embedUrl: 'https://rumble.com/embed/:id',
      pattern: /rumble\.com\/(?<id>[^/]+)\/?/,
    });
  }
}
