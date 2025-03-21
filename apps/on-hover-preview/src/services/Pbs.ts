import { ServiceFactory } from './base/ServiceFactory';

export class Pbs extends ServiceFactory {
  constructor() {
    super({
      embedUrl: 'https://player.pbs.org/portalplayer/:id',
      pattern: /pbs\.org\/video\/(?<id>.+)?/,
    });
  }
}
