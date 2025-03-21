import { ServiceFactory } from './base/ServiceFactory';

export class Rss extends ServiceFactory {
  constructor() {
    super(
      {
        embedUrl: 'https://player.rss.com/:show/:id',
        heightFunction: ({ id }) => (id ? '152px' : '320px'),
        pattern: /rss\.com\/podcasts\/(?<show>[^/]+)\/(?<id>\d*)/,
        queryParams: {
          theme: ':theme',
        },
      },
      {
        width: '500px',
        borderRadius: '8px',
        height: '152px',
      }
    );
  }
}
