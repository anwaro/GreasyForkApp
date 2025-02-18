import { render } from 'preact';

import { UserSettingsButton } from '../components/user-settings/UserSettingsButton';
import { UserSettingModal } from '../components/user-settings/UserSettingsModal';
import { BaseService } from './BaseService';
import { ServiceName } from './ServiceName';

export class UserSettings extends BaseService {
  name = ServiceName.UserSettings;
  private ready = false;

  public init() {
    this.initUserSettings();
    window.setTimeout(this.initUserSettings.bind(this), 1000);
    window.setTimeout(this.initUserSettings.bind(this), 3000);
    window.setTimeout(this.initUserSettings.bind(this), 5000);
  }

  private getMenuItem() {
    const userMenu = document.querySelector<HTMLLIElement>(
      '[data-testid="preferences-item"]'
    );

    if (!userMenu || !userMenu.parentElement) {
      return undefined;
    }

    const li = document.createElement('li');
    li.className = 'gl-new-dropdown-item';
    userMenu.parentElement.append(li);

    return li;
  }

  private initUserSettings() {
    if (this.ready) {
      return;
    }

    const userMenu = this.getMenuItem();

    if (!userMenu) {
      return;
    }

    this.ready = true;

    render(<UserSettingsButton />, userMenu);
    render(<UserSettingModal />, this.rootBody('glp-user-settings-root'));
  }
}
