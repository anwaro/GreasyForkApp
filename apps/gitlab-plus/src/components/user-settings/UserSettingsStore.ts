import { Store } from '@store/Store';

import { ServiceName, servicesConfig } from '../../services/ServiceName';
import { defaultUserConfig, UserConfig, UserConfigType } from './UserConfig';

type ActiveStatusType = Partial<Record<ServiceName, boolean>>;

class UserSettingsStore {
  private activeStatusStore = new Store<ActiveStatusType>('glp-settings');
  private configStore = new Store<UserConfigType>('glp-config');

  getConfig(name: UserConfig) {
    return this.getConfigItem(name);
  }

  isActive(name: ServiceName) {
    if (!(name in servicesConfig)) {
      return false;
    }
    if (servicesConfig[name].required) {
      return true;
    }

    if (servicesConfig[name].experimental) {
      return this.getActiveStatusItem(name, false);
    }

    return this.getActiveStatusItem(name, true);
  }

  setConfig(name: UserConfig, value: string) {
    this.setConfigItem(name, value);
  }

  setIsActive(name: ServiceName, value: boolean) {
    this.setActiveStatusItem(name, value);
  }

  private getActiveStatusItem<Key extends keyof ActiveStatusType>(
    key: Key,
    defaultValue?: ActiveStatusType[Key]
  ): ActiveStatusType[Key] {
    const items = this.getActiveStatusItems();
    if (items[key] === undefined) {
      return defaultValue;
    }
    return items[key];
  }

  private getActiveStatusItems() {
    return this.activeStatusStore.get() || {};
  }

  private getConfigItem<Key extends keyof UserConfigType>(
    key: Key
  ): UserConfigType[Key] {
    const items = this.getConfigItems();
    return items[key];
  }

  private getConfigItems(): UserConfigType {
    return { ...defaultUserConfig, ...(this.configStore.get() || {}) };
  }

  private setActiveStatusItem<Key extends keyof ActiveStatusType>(
    key: Key,
    value: ActiveStatusType[Key]
  ) {
    const items = this.getActiveStatusItems();
    this.activeStatusStore.set({
      ...items,
      [key]: value,
    });
  }

  private setConfigItem<Key extends keyof UserConfigType>(
    key: Key,
    value: UserConfigType[Key]
  ) {
    const items = this.getConfigItems();
    this.configStore.set({
      ...items,
      [key]: value,
    });
  }
}

export const userSettingsStore = new UserSettingsStore();
