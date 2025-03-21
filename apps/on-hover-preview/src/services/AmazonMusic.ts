import { ServiceFactory } from './base/ServiceFactory';

export class AmazonMusic extends ServiceFactory {
  constructor() {
    super(
      {
        embedUrl: 'https://music.amazon.com/embed/:id',
        pattern:
          /music\.amazon\.com\/(?<type>albums|tracks|artists|playlists)\/(?<id>[^/?]+)/,
        typeHeight: { tracks: '250px' },
      },
      {
        width: '500px',
        borderRadius: '12px',
        height: '372px',
      }
    );
  }
}
