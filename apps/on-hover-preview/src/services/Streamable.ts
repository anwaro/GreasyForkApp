import { BaseService } from './BaseService';

export class Streamable extends BaseService {
  public styles = {
    width: '500px',
    height: '300px',
  };

  public async embeddedVideoUrl({ href }: HTMLAnchorElement): Promise<string> {
    const id = this.extractId(href, /\.com\/([s|o]\/)?(?<id>[^?/]+).*$/);

    return `https://streamable.com/o/${id}?autoplay=1`;
  }

  isValidUrl(url: string): boolean {
    return url.includes('streamable.com');
  }
}
