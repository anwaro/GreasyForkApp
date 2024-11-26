import { BaseService } from './BaseService';

export class Vimeo extends BaseService {
  public styles = {
    width: '500px',
    height: '285px',
  };

  public async embeddedVideoUrl(element: HTMLAnchorElement): Promise<string> {
    let id = '';
    if (/\/\d+(\/.*)?$/.test(element.pathname)) {
      id = element.pathname.replace(/\D+/g, '');
    } else {
      const response = await fetch(
        `https://vimeo.com/api/oembed.json?url=${element.href}`
      );
      const data = await response.json();
      id = data.video_id;
    }
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }

  isValidUrl(url: string): boolean {
    return url.includes('vimeo.com');
  }
}
