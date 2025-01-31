import { BaseService } from './BaseService';

export class Facebook extends BaseService {
  public styles = {
    width: '500px',
    height: '282px',
  };

  public async embeddedVideoUrl(element: HTMLAnchorElement) {
    const params = this.params({
      width: '500',
      autoplay: 'true',
      href: element.href,
      show_text: 'false',
    });

    return `https://www.facebook.com/plugins/video.php?${params}`;
  }

  isValidUrl(url: string): boolean {
    return /https:\/\/(www\.|m\.)?facebook\.com\/[\w\-_]+\/videos\//.test(url);
  }
}
