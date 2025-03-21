import { ServiceFactory } from './base/ServiceFactory';

export class Twitter extends ServiceFactory {
  constructor() {
    super(
      {
        embedUrl: 'https://platform.:platform.com/embed/Tweet.html',
        pattern: /(?<platform>twitter|x)\.com\/.+\/status\/(?<id>\d+)\/video/,
        queryParams: {
          id: ':id',
          maxWidth: 480,
          width: 480,
          theme: ':theme',
        },
      },
      {
        width: '500px',
        height: '300px',
      }
    );
  }
}
