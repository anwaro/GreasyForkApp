import { ServiceFactory } from './base/ServiceFactory';

export class Instagram extends ServiceFactory {
  constructor() {
    super(
      {
        embedUrl: 'https://www.instagram.com/p/:id/embed/',
        pattern: /instagram\.com\/(.+\/)?reel\/(?<id>[^/?]+)/,
      },
      {
        width: '300px',
        height: '500px',
      }
    );
  }
}
