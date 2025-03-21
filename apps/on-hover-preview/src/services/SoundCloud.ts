import { ServiceFactory } from './base/ServiceFactory';

export class SoundCloud extends ServiceFactory {
  constructor() {
    super(
      {
        embedUrl: 'https://w.soundcloud.com/player',
        pattern: /soundcloud\.com\/[^/]+\/[^/?]+/,
        queryParams: {
          hide_related: 'true',
          auto_play: 'true',
          show_artwork: 'true',
          show_comments: 'false',
          show_teaser: 'false',
          url: ':href',
          visual: 'false',
        },
      },
      {
        width: '600px',
        height: '166px',
      }
    );
  }
}
