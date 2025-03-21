import { ServiceFactory } from './base/ServiceFactory';

export class Tidal extends ServiceFactory {
  constructor() {
    super(
      {
        embedUrl: 'https://embed.tidal.com/:types/:id',
        pattern:
          /tidal\.com\/(.+\/)?(?<type>track|album|video|playlist)\/(?<id>\d+|[\w-]+)/,
        typeHeight: {
          video: '281px',
          playlist: '400px',
          track: '120px',
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
