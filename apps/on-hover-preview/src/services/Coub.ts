import { BaseService } from './BaseService';

export class Coub extends BaseService {
  public styles = {
    width: '500px',
    height: '290px',
  };

  public async embeddedVideoUrl({ href }: HTMLAnchorElement): Promise<string> {
    const id = this.extractId(href, /view\/(?<id>[^/]+)\/?/);

    const params = this.params({
      autostart: 'true',
      muted: 'false',
      originalSize: 'false',
      startWithHD: 'true',
    });

    return `https://coub.com/embed/${id}?${params}`;
  }

  isValidUrl(url: string): boolean {
    return url.includes('coub.com/view');
  }
}
