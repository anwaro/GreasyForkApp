import { MenuItem } from './MenuItem';

export class Elements {
  static menu() {
    return Elements.ref<HTMLDivElement>(
      '[data-menu="prefs"] [class^=Menu_module_menuPanel]'
    );
  }

  static menuItem() {
    return Elements.ref<HTMLDivElement>(
      '[data-menu="prefs"] [class^=Menu_module_menuPanel] [class^=MenuOption_module_option]'
    );
  }

  static menuItemLabel() {
    return Elements.menuItem()?.querySelector<HTMLSpanElement>('span');
  }

  static menuItemWithLabel(labels: string[]) {
    const optionItems = [
      ...document.querySelectorAll<HTMLDivElement>(
        '[data-menu="prefs"] [class^=MenuOption_module_option]'
      ),
    ];

    return optionItems.find(
      (e) =>
        e.id !== MenuItem.ID &&
        labels.some((text) => e.innerText.includes(text))
    );
  }

  static menuQualityItem() {
    return Elements.menuItemWithLabel([
      'Quality',
      'Calidad',
      'Qualität',
      'Qualité',
      'Qualidade',
      '画質',
      '고화질',
    ]);
  }

  static menuSpeedItem() {
    return Elements.menuItemWithLabel([
      'Speed',
      'Velocidad',
      'Geschwindigkeit',
      'Vitesse',
      'Velocidade',
      'スピード',
      '속도',
    ]);
  }

  static menuSpeedLabel() {
    return Elements.menuSpeedItem()?.querySelector<HTMLSpanElement>('span');
  }

  static ref<T extends HTMLElement>(selector: string): null | T {
    return document.querySelector<T>(selector);
  }

  static video() {
    return Elements.ref<HTMLVideoElement>('.vp-video video');
  }
}
