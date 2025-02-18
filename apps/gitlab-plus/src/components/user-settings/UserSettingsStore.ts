import { Store } from '@store/Store';

import { ServiceName, servicesConfig } from '../../services/ServiceName';

type SettingsType = Partial<Record<ServiceName, boolean>>;

class UserSettingsStore {
  private settings: SettingsType = {};
  private store = new Store<SettingsType>('gitlab-plus-settings');

  constructor() {
    this.load();
  }

  isActive(name: ServiceName) {
    if (!(name in servicesConfig)) {
      return false;
    }
    if (servicesConfig[name].required) {
      return true;
    }

    if (servicesConfig[name].experimental) {
      return this.getItem(name, false);
    }

    return this.getItem(name, true);
  }

  setIsActive(name: ServiceName, value: boolean) {
    this.setItem(name, value);
  }

  private getItem<Key extends keyof SettingsType>(
    key: Key,
    defaultValue?: SettingsType[Key]
  ): SettingsType[Key] {
    if (this.settings[key] === undefined) {
      return defaultValue;
    }
    return this.settings[key];
  }

  private load() {
    this.settings = this.store.get() || {};
  }

  private persist() {
    this.store.set(this.settings);
  }

  private setItem<Key extends keyof SettingsType>(
    key: Key,
    value: SettingsType[Key]
  ) {
    this.settings[key] = value;
    this.persist();
  }
}

export const userSettingsStore = new UserSettingsStore();
