import { delay } from '@utils/delay';

import { SpeedMenuItem } from './SpeedMenuItem';

export class Menu {
  constructor() {
    this.getMenu();
  }

  addCustomSpeedItem(item: SpeedMenuItem) {
    const menu = this.getMenu();
    const defaultItem = this.getDefaultMenuItem();

    if (menu === null) {
      return false;
    }

    if (this.menuHasCustomItem(menu)) {
      defaultItem?.parentNode?.removeChild(defaultItem);
      return true;
    }

    if (defaultItem) {
      defaultItem.replaceWith(item.getElement());
    } else {
      menu.appendChild(item.getElement());
    }

    return true;
  }

  getDefaultMenuItem() {
    const defaultSpeedItem = [
      ...document.querySelectorAll('.ytp-menuitem'),
    ].filter((e) => {
      const path = e
        .querySelector('.ytp-menuitem-icon path')
        ?.getAttribute('d');
      return path?.startsWith('M10,8v8l6-4L10,');
    });

    if (defaultSpeedItem.length) {
      return defaultSpeedItem[0] as HTMLDivElement;
    }

    return undefined;
  }

  getLabel() {
    const label = this.getDefaultMenuItem()?.querySelector(
      '.ytp-menuitem-label'
    ) as HTMLDivElement | null;

    return label?.innerText;
  }

  getMenu() {
    return document.querySelector(
      '.ytp-settings-menu .ytp-panel-menu'
    ) as HTMLDivElement | null;
  }

  menuHasCustomItem(menu: HTMLDivElement) {
    return Boolean(menu.querySelector(`#${SpeedMenuItem.ID}`));
  }

  async reopenMenu() {
    const menuButton = document.querySelector(
      '.ytp-settings-button'
    ) as HTMLButtonElement;
    const menu = this.getMenu();

    if (menu && this.menuHasCustomItem(menu)) {
      return;
    }

    if (menuButton) {
      menu?.style?.setProperty('opacity', '0');
      menuButton.click();
      await delay(50);
      menuButton.click();
      menu?.style?.setProperty('opacity', '1');
      await delay(50);
    }
  }
}
