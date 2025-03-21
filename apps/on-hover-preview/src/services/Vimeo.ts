import { ServiceFactory } from './base/ServiceFactory';

export class Vimeo extends ServiceFactory {
  constructor() {
    super({
      embedUrl: 'https://player.vimeo.com/video/:id',
      pattern: /vimeo\.com(.+)*\/(?<id>\d+)\/?$/,
    });
  }
}
