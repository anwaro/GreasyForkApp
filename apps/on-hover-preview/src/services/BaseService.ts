type ServiceStyle = {
  width: string;
  height: string;
} & Record<string, number | string>;

export abstract class BaseService {
  abstract styles: ServiceStyle;

  abstract embeddedVideoUrl(
    element: HTMLAnchorElement
  ): Promise<string | undefined>;

  extractId(url: string, match: RegExp): string {
    const result = url.match(match);

    if (result) {
      return result.groups?.id || '';
    }

    return '';
  }

  abstract isValidUrl(url: string): boolean;

  match<T extends Record<string, string>>(
    url: string,
    match: RegExp
  ): T | undefined {
    const result = url.match(match);

    if (result && result.groups) {
      return result.groups as T;
    }

    return undefined;
  }

  params(params: Record<string, number | string>) {
    return Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }

  theme(light: string, dark: string) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? dark
      : light;
  }
}
