import { Observer } from '@ui/Observer';
import { ElementDetector } from './ElementDetector';
import { FeedCleaner } from './FeedCleaner';

export class FacebookCleaner {
  private observer = new Observer();
  private detector = new ElementDetector();
  private feedCleaner = new FeedCleaner();
  private feedElement: HTMLDivElement | undefined = undefined;

  constructor() {
    this.initEvents();
  }

  run() {
    this.initFeedElement();
    this.initObserver();
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
      });
    }
  }

  private feedListUpdated() {
    if (this.isValidElement(this.feedElement)) {
      this.feedCleaner.cleanFeed(this.feedElement);
    }
  }

  private isValidElement(
    element: HTMLDivElement | undefined
  ): element is HTMLDivElement {
    return element && element.isConnected;
  }

  private initEvents() {
    window.addEventListener('urlchange', this.run.bind(this));
  }
}