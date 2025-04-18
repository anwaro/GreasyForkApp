import { UserSettingsButton } from '../components/user-settings/UserSettingsButton';
import { UserSettingModal } from '../components/user-settings/UserSettingsModal';
import { ServiceName } from '../consts/ServiceName';
import { RendererHelper } from '../helpers/RendererHelper';
import { BaseService } from './BaseService';

export class UserSettings extends BaseService {
  public name = ServiceName.UserSettings;

  public init() {
    this.setup(this.initUserSettings.bind(this));
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
    const userMenu = this.getMenuItem();

    if (!userMenu) {
      return;
    }

    this.ready = true;
    RendererHelper.renderInNode(userMenu, <UserSettingsButton />);
    RendererHelper.renderInBody('glp-user-settings-root', <UserSettingModal />);
  }
}
