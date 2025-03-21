import { ServiceFactory } from './base/ServiceFactory';

export class Podbean extends ServiceFactory {
  constructor() {
    super(
      {
        embedUrl: 'https://www.podbean.com/player-v2',
        pattern: /podbean\.com\/.+\/(?<type>dir|pb)-(?<id>[^/?]+)\/?/,
        queryParams: {
          i: ':id-:type',
        },
      },
      {
        width: '500px',
        height: '150px',
      }
    );
  }
}
