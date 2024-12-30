import { BaseService } from './BaseService';

export class Youtube extends BaseService {
  public styles = {
    width: '500px',
    height: '300px',
  };

  public async embeddedVideoUrl({
    href,
    search,
  }: HTMLAnchorElement): Promise<string> {
    const urlParams = new URLSearchParams(search);
    let id = urlParams.get('v') || '';
    let start = urlParams.get('t') || '0';

    if (href.includes('youtu.be')) {
      id = this.extractId(href, /\.be\/(?<id>[^?/]+).*$/);
    } else if (href.includes('youtube.com/attribution_link')) {
      const url = decodeURIComponent(urlParams.get('u') || `/watch?v=${id}`);
      const attrUrl = new URL(`https://youtube.com${url}`);
      const attrParams = new URLSearchParams(attrUrl.search);
      id = attrParams.get('v') || id;
      start = attrParams.get('t') || start;
    }
    if (/(?:(\d+)h)?(?:(\d+)m)?(\d+)s/.test(start)) {
      const [hour = '0', minutes = '0', seconds = '-1'] = start.match(
        /(?:(\d+)h)?(?:(\d+)m)?(\d+)s/
      );
      if (seconds !== '-1') {
        start = `${(Number(hour) * 60 + Number(minutes)) * 60 + seconds}`;
      }
    }

    const params = this.params({
      autoplay: 1,
      enablejsapi: 1,
      fs: 1,
      start: start,
    });

    return `https://www.youtube.com/embed/${id}?${params}`;
  }

  isValidUrl(url: string): boolean {
    return (
      url.includes('youtube.com/attribution_link') ||
      url.includes('youtube.com/watch') ||
      url.includes('youtu.be/')
    );
  }
}
