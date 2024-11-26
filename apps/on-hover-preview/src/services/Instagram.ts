import { BaseService } from './BaseService';

export class Instagram extends BaseService {
  public styles = {
    width: '300px',
    height: '500px',
  };

  public async embeddedVideoUrl({ href }: HTMLAnchorElement) {
    const id = this.extractId(href, /reel\/(?<id>[^/]+)\//);

    return `https://www.instagram.com/p/${id}/embed/`;
  }

  isValidUrl(url: string): boolean {
    return /instagram\.com\/([a-zA-Z0-9._]{1,30}\/)?reel/.test(url);
  }
}
