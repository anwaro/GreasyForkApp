declare global {
  // eslint-disable-next-line no-var
  var onurlchange: null | undefined | VoidFunction;
}

export function activateUrlChangeEvents() {
  if (!window.onurlchange) {
    function dispatchUrlChangeEvent() {
      window.dispatchEvent(new CustomEvent('urlchange'));
    }

    window.addEventListener('popstate', dispatchUrlChangeEvent);
    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      dispatchUrlChangeEvent();
    };

    const originalReplaceState = history.replaceState;
    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      dispatchUrlChangeEvent();
    };
  }
}
