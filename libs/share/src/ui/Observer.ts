export class Observer {
  private observer?: MutationObserver;

  start(
    element: HTMLElement,
    callback: MutationCallback,
    options?: MutationObserverInit
  ) {
    this.stop();
    this.observer = new MutationObserver(callback);

    this.observer.observe(
      element,
      options || {
        attributeOldValue: true,
        attributes: true,
        characterData: true,
        characterDataOldValue: true,
        childList: true,
        subtree: true,
      }
    );
  }

  stop() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
