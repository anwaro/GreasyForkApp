import { ServiceFactory } from './base/ServiceFactory';

export class Spotify extends ServiceFactory {
  constructor() {
    super(
      {
        embedUrl: 'https://open.spotify.com/embed/:type/:id',
        pattern:
          /spotify\.com\/(.+\/)?(?<type>track|album|playlist|episode|artist|show)\/(?<id>[\w-]+)/,
        typeHeight: { track: '152px' },
        urlFunction: ({ type, url }) =>
          ['episode', 'show'].includes(type) ? `${url}/video` : url,
      },
      {
        width: '600px',
        borderRadius: '12px',
        height: '352px',
      }
    );
  }
}
