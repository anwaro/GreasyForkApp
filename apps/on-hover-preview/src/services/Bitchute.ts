import { ServiceFactory } from './base/ServiceFactory';

export class Bitchute extends ServiceFactory {
  constructor() {
    super({
      embedUrl: 'https://bitchute.com/embed/:id',
      pattern: /bitchute\.com\/video\/(?<id>[^/?]+)\/?/,
    });
  }
}
