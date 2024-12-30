import { Observer } from '@ui/Observer';

import { ElementDetector } from './ElementDetector';
import { FeedCleaner } from './FeedCleaner';

export class FacebookCleaner {
  private detector = new ElementDetector();
  private feedCleaner = new FeedCleaner();
  private feedElement: HTMLDivElement | undefined = undefined;
  private observer = new Observer();

  constructor() {
    this.initEvents();
  }

  run() {
    this.initFeedElement();
    this.initObserver();
    this.feedListUpdated();
  }

  private feedListUpdated() {
    if (this.isValidElement(this.feedElement)) {
      this.feedCleaner.cleanFeed(this.feedElement);
    }
  }

  private initEvents() {
    window.addEventListener('urlchange', () => {
      this.run();
      window.setTimeout(this.run.bind(this), 2000);
      window.setTimeout(this.run.bind(this), 5000);
    });

    window.setInterval(this.run.bind(this), 20 * 1000);
  }

  private initFeedElement() {
    if (!this.isValidElement(this.feedElement)) {
      this.feedElement = this.detector.getFeedElement();
    }
  }

  private initObserver() {
    if (!this.isValidElement(this.feedElement)) {
      return this.observer.stop();
    }

    if (!this.feedElement.dataset.fccReady) {
      this.feedElement.dataset.fccReady = '1';
      this.observer.start(this.feedElement, this.feedListUpdated.bind(this), {
        childList: true,
        subtree: true,
      });
    }
  }

  private isValidElement(
    element: HTMLDivElement | undefined
  ): element is HTMLDivElement {
    return element && element.isConnected;
  }
}
