import { Lang, languages, LocaleDictionary, locales } from './locales';

export class Dictionary {
  private readonly dictionary: LocaleDictionary | undefined;
  private readonly lang: Lang | undefined;

  constructor() {
    this.lang = this.detectLanguage();
    this.dictionary = this.getDictionary();
  }

  getFeedLabel() {
    return this.dictionary.feed;
  }

  getFollowLabel() {
    return this.dictionary.follow;
  }

  getJoinLabel() {
    return this.dictionary.join;
  }

  getReelsLabel() {
    return this.dictionary.reels;
  }

  getSponsoredLabel() {
    return this.dictionary.sponsored;
  }

  hiddenPostLabel(count: number) {
    return `${this.dictionary.hiddenPost} (${count})`;
  }

  private detectLanguage() {
    const pageLang = window.document.documentElement.lang as Lang;
    if (pageLang && languages.includes(pageLang)) {
      return pageLang;
    }
    return undefined;
  }

  private getDictionary() {
    if (this.lang) {
      return locales[this.lang];
    }
    return undefined;
  }
}
