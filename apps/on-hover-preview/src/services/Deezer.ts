import { ServiceFactory } from './base/ServiceFactory';

export class Deezer extends ServiceFactory {
  constructor() {
    super(
      {
        embedUrl: 'https://widget.deezer.com/widget/:theme/:type/:id',
        pattern:
          /deezer\.com\/.{2}\/(?<type>album|playlist|track|artist|show|episode)\/(?<id>\d+)/,
        queryParams: {
          autoplay: 'true',
          radius: 'true',
          tracklist: 'false',
        },
      },
      {
        width: '500px',
        borderRadius: '10px',
        height: '300px',
      }
    );
  }
}
