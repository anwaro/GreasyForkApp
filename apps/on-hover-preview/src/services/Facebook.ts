import { ServiceFactory } from './base/ServiceFactory';

export class Facebook extends ServiceFactory {
  constructor() {
    super({
      embedUrl: 'https://www.facebook.com/plugins/video.php',
      pattern: /https:\/\/(www\.|m\.)?facebook\.com\/[\w\-_]+\/videos\//,
      queryParams: {
        width: '500',
        autoplay: 'true',
        href: ':href',
        show_text: 'false',
      },
    });
  }
}
