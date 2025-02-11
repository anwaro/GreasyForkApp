import { BaseService } from './BaseService';

export class Rumble extends BaseService {
  public styles = {
    width: '500px',
    height: '290px',
  };

  public async embeddedVideoUrl(_element: HTMLAnchorElement): Promise<string> {
    return undefined;

    // const content = await fetch(
    //   `https://rumble.com/api/Media/oembed.json?url=${element.href}`
    // );
    // const data = await content.json();
    // return this.extractId(data.html, / src="(?<id>[^"]+)"/);
  }

  isValidUrl(url: string): boolean {
    return url.includes('rumble.com');
  }
}
