import { BaseService } from './BaseService';

export class Facebook extends BaseService {
  public styles = {
    width: '500px',
    height: '282px',
  };

  public async embeddedVideoUrl(element: HTMLAnchorElement) {
    const params = this.params({
      autoplay: 'true',
      width: '500',
      show_text: 'false',
      href: element.href,
    });

    return `https://www.facebook.com/plugins/video.php?${params}`;
  }

  isValidUrl(url: string): boolean {
    return /https:\/\/(www\.|m\.)?facebook\.com\/[\w\d\-_]+\/videos\//.test(
      url
    );
  }
}
