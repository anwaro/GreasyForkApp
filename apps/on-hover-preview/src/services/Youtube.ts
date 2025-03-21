import { ServiceFactory } from './base/ServiceFactory';

class YoutubeHelper {
  static getId(search: string) {
    return new URLSearchParams(search).get('v') || '';
  }

  static getStartTime(search: string) {
    const start = new URLSearchParams(search).get('t') || '0s';
    const result = start.match(/(?:(?<h>\d+)h)?(?:(?<m>\d+)m)?(?<s>\d+)s/);
    if (result && result.groups) {
      return (
        Number(result.groups.h || '0') * 3600 +
        Number(result.groups.m || '0') * 60 +
        Number(result.groups.s || '0')
      );
    }
    return 0;
  }
}

export class Youtube extends ServiceFactory {
  constructor() {
    super({
      embedUrl: 'https://www.youtube.com/embed/:id',
      pattern: /youtube\.com\/watch/,
      queryParams: {
        autoplay: 1,
        start: ':start',
      },
      urlFunction: ({ search, url }) =>
        this.bindParams(url, {
          id: YoutubeHelper.getId(search),
          start: YoutubeHelper.getStartTime(search),
        }),
    });
  }
}

export class YoutubeShortcut extends ServiceFactory {
  constructor() {
    super({
      embedUrl: 'https://www.youtube.com/embed/:id',
      pattern: /youtu\.be\/(?<id>[^?/]+)/,
      queryParams: {
        autoplay: 1,
        start: ':start',
      },
      urlFunction: ({ search, url }) =>
        this.bindParams(url, {
          start: YoutubeHelper.getStartTime(search),
        }),
    });
  }
}

export class YoutubeShorts extends ServiceFactory {
  constructor() {
    super(
      {
        embedUrl: 'https://www.youtube.com/embed/:id',
        pattern: /youtube\.com\/shorts\/(?<id>[^?/]+).*$/,
        queryParams: {
          autoplay: 1,
        },
      },
      {
        width: '256px',
        height: '454px',
      }
    );
  }
}
