import { ServiceFactory } from './base/ServiceFactory';

export class Tiktok extends ServiceFactory {
  constructor() {
    super(
      {
        embedUrl: 'https://www.tiktok.com/player/v1/:id',
        pattern: /tiktok\.com\/.+\/video\/(?<id>\d+)/,
        queryParams: {
          autoplay: 1,
          rel: 0,
        },
      },
      {
        width: '338px',
        height: '575px',
      }
    );
  }
}
