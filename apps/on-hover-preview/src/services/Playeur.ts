import { ServiceFactory } from './base/ServiceFactory';

export class Playeur extends ServiceFactory {
  constructor() {
    super({
      embedUrl: 'https://playeur.com/embed/:id',
      pattern: /playeur\.com\/(v|embed)\/(?<id>[^/]+)\/?/,
    });
  }
}
