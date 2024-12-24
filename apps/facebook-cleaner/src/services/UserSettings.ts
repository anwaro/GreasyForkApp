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

export enum SettingsItemId {
  HideSponsored = 'fcc-hide-sponsored',
  HideReels = 'fcc-hide-reels',
  HideSuggestedGroups = 'fcc-hide-suggested-groups',
  HideSuggestedProfiles = 'fcc-hide-suggested-profiles',
}

const settingsMenuLabels: Record<SettingsItemId, string> = {
  [SettingsItemId.HideSponsored]: 'sponsored posts',
  [SettingsItemId.HideReels]: 'reels',
  [SettingsItemId.HideSuggestedGroups]: 'suggested groups',
  [SettingsItemId.HideSuggestedProfiles]: 'suggested profiles',
};

export type UserSettingsType = Record<SettingsItemId, boolean>;

export class UserSettings {
  private setting: UserSettingsType = {
    [SettingsItemId.HideSponsored]: true,
    [SettingsItemId.HideReels]: true,
    [SettingsItemId.HideSuggestedGroups]: true,
    [SettingsItemId.HideSuggestedProfiles]: true,
  };

  constructor() {
    this.setting = this.readSettings();
    this.updateMenu();
  }

  getSettings(): UserSettingsType {
    return { ...this.setting };
  }

  private readSettings() {
    return Object.fromEntries(
      Object.entries(this.setting).map(([key, defaultValue]) => [
        key,
        GM_getValue(key, defaultValue),
      ])
    ) as UserSettingsType;
  }

  private settingLabel(id: SettingsItemId) {
    return [
      this.setting[id] ? 'Show' : 'Hide',
      settingsMenuLabels[id],
      'in feed news',
    ].join(' ');
  }

  private setSettingValue(id: SettingsItemId, value: boolean) {
    this.setting[id] = value;
    GM_setValue(id, value);
    this.updateMenu();
  }

  private updateMenu() {
    Object.keys(this.setting).forEach((id) => GM_unregisterMenuCommand(id));
    Object.entries(this.setting).forEach(([id, value]) =>
      GM_registerMenuCommand(
        this.settingLabel(id as SettingsItemId),
        () => this.setSettingValue(id as SettingsItemId, !value),
        {
          id,
          autoClose: true,
        }
      )
    );
  }
}
