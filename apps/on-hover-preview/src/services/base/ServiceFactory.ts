import { BaseService, defaultServiceStyle, ServiceStyle } from './BaseService';

type PatternParams = Record<string, string>;

type ElementUrlParams = {
  href: string;
  pathname: string;
  search: string;
};

type PatternProps<T extends PatternParams = PatternParams> = {
  id: string;
  theme: 'dark' | 'light';
  type?: string | undefined;
} & T;

type UrlProps<T extends PatternParams> = PatternProps<T> &
  ElementUrlParams & {
    url: string;
  };

type Config<T extends PatternParams> = {
  embedUrl: string;
  heightFunction?: (props: PatternProps<T>) => string;
  pattern: RegExp;
  queryParams?: Record<string, number | string>;
  typeHeight?: Record<string, string>;
  urlFunction?: (props: UrlProps<T>) => string;
};

export class ServiceFactory<
  T extends PatternParams = PatternParams
> extends BaseService {
  private initialStyles: ServiceStyle;

  constructor(
    private config: Config<T>,
    public styles: ServiceStyle = defaultServiceStyle
  ) {
    super();
    this.initialStyles = styles;
  }

  bindParams(url: string, params: Record<string, number | string>) {
    return Object.entries(params).reduce(
      (acc, [key, value]) =>
        acc.replace(`:${key}`, value !== undefined ? `${value}` : ''),
      url
    );
  }

  public async embeddedVideoUrl(element: HTMLAnchorElement) {
    const isDarkMode = this.isDarkmode();

    const patternParams =
      this.match<PatternProps<T>>(element.href, this.config.pattern) ||
      ({} as PatternProps<T>);

    const urlParams = {
      ...patternParams,
      ...this.urlParams(element),
      theme: isDarkMode ? 'dark' : 'light',
    };

    this.styles = {
      ...this.initialStyles,
      height: this.getHeight(urlParams),
    };

    const embedUrl = this.bindParams(
      this.createUrl(this.config.embedUrl, this.config.queryParams),
      urlParams
    );

    if (this.config.urlFunction) {
      return this.config.urlFunction({
        ...urlParams,
        url: embedUrl,
      });
    }
    return embedUrl;
  }

  isValidUrl(url: string): boolean {
    return this.config.pattern.test(url);
  }

  private getHeight(urlParams: PatternProps<T>) {
    if (this.config.heightFunction) {
      return this.config.heightFunction(urlParams);
    }

    if (this.config.typeHeight && urlParams.type in this.config.typeHeight) {
      return this.config.typeHeight[urlParams.type];
    }

    return this.initialStyles.height;
  }

  private urlParams(element: HTMLAnchorElement): ElementUrlParams {
    return {
      href: element.href,
      pathname: element.pathname,
      search: element.search,
    };
  }
}
