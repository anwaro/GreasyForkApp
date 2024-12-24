import { Dictionary } from '../dictionary/Dictionary';

export class ElementDetector {
  private dictionary = new Dictionary();

  getElements<E extends HTMLElement = HTMLElement>(
    root: HTMLElement | Document,
    query: string,
    text?: string
  ): E[] {
    return [...root.querySelectorAll<E>(query)].filter((element) => {
      if (!text) {
        return true;
      }
      return element.textContent.includes(text);
    });
  }

  getElement<E extends HTMLElement = HTMLElement>(
    root: HTMLElement | Document,
    query: string,
    text?: string
  ): E | undefined {
    return this.getElements<E>(root, query, text)[0];
  }

  getFeedElement() {
    const [feedHeader] = this.getElements<HTMLHeadingElement>(
      document,
      'h3.html-h3',
      this.dictionary.getFeedLabel()
    );

    if (!feedHeader) {
      return undefined;
    }

    const feedElement = feedHeader.parentElement.lastElementChild;

    return feedElement as HTMLDivElement;
  }
}
