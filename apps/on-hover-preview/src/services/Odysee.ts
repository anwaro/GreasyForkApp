import { BaseService } from './BaseService';

export class Odysee extends BaseService {
  public styles = {
    width: '500px',
    height: '280px',
  };

  public async embeddedVideoUrl(element: HTMLAnchorElement): Promise<string> {
    const params = this.params({
      autoplay: 'true',
    });

    return `https://odysee.com/$/embed${element.pathname}?${params}`;
  }

  isValidUrl(url: string): boolean {
    return url.includes('odysee.com');
  }
}
