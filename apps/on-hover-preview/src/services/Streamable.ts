import { ServiceFactory } from './base/ServiceFactory';

export class Streamable extends ServiceFactory {
  constructor() {
    super({
      embedUrl: 'https://streamable.com/o/:id',
      pattern: /streamable\.com\/([s|o]\/)?(?<id>[^?/]+).*$/,
      queryParams: {
        autoplay: '1',
      },
    });
  }
}
