declare global {
  var GM_registerMenuCommand: (
    label: string,
    callback: (event: MouseEvent) => void,
    options?: {
      id: string;
      autoClose?: boolean;
      tile?: string;
    }
  ) => void;
  var GM_unregisterMenuCommand: (id: string) => void;
  var GM_setValue: (key: string, value: unknown) => void;
  var GM_getValue: <T, D>(key: string, defaultValue: D) => T | D;
}

export class UserSettings {
  private hideReelsMenuId = 'fcc-show-reels';
  private hideReels: boolean;

  constructor() {
    this.hideReels = GM_getValue(this.hideReelsMenuId, false);
    this.updateMenu();
  }

  getHideReels() {
    return this.hideReels;
  }

  private toggleReels() {
    this.hideReels = !this.hideReels;
    GM_setValue(this.hideReelsMenuId, this.hideReels);
    this.updateMenu();
  }

  private updateMenu() {
    GM_unregisterMenuCommand(this.hideReelsMenuId);
    GM_registerMenuCommand(
      this.hideReels ? 'Show reels in feed' : 'Hide reels in feed',
      this.toggleReels.bind(this),
      {
        id: this.hideReelsMenuId,
        autoClose: true,
      }
    );
  }
}
