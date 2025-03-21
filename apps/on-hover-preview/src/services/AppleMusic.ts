import { ServiceFactory } from './base/ServiceFactory';

export class AppleMusic extends ServiceFactory {
  constructor() {
    super(
      {
        embedUrl: 'https://embed.:service.apple.com:pathname',
        pattern:
          /(?<service>music|podcasts)\.apple\.com\/.{2}\/(?<type>song|music-video|artist|album|podcast)/,
        typeHeight: {
          'music-video': '281px',
          song: '175px',
        },
      },
      {
        width: '500px',
        borderRadius: '12px',
        height: '450px',
      }
    );
  }
}
