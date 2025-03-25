import { Cache } from '@store/Cache';

import { AppConfig } from '../../consts/AppConfig';
import { ServiceName, servicesConfig } from '../../consts/ServiceName';
import { defaultUserConfig, UserConfig, UserConfigType } from './UserConfig';

type ActiveStatusType = Partial<Record<ServiceName, boolean>>;

type ConfigValue = ActiveStatusType & UserConfigType;

class UserSettingsStore {
  static ConfigKey = 'app-config';
  private store = new Cache(AppConfig.CachePrefix);

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
      return this.getConfigItem(name, false);
    }

    return this.getConfigItem(name, true);
  }

  setConfig(name: UserConfig, value: string) {
    this.setConfigItem(name, value);
  }

  setIsActive(name: ServiceName, value: boolean) {
    this.setConfigItem(name, value);
  }

  private getConfigItem<Key extends keyof ConfigValue>(
    key: Key,
    defaultValue?: ConfigValue[Key]
  ): ConfigValue[Key] {
    const items = this.getConfigItems();
    if (items[key] === undefined) {
      return defaultValue as ConfigValue[Key];
    }
    return items[key];
  }

  private getConfigItems(): ConfigValue {
    return {
      ...defaultUserConfig,
      ...this.store.get(UserSettingsStore.ConfigKey, {}),
    };
  }

  private setConfigItem<Key extends keyof ConfigValue>(
    key: Key,
    value: ConfigValue[Key]
  ) {
    const items = this.getConfigItems();
    this.store.set(
      UserSettingsStore.ConfigKey,
      {
        ...items,
        [key]: value,
      },
      'lifetime'
    );
  }
}

export const userSettingsStore = new UserSettingsStore();
