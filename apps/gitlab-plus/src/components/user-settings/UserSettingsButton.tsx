import { ShowUserSettingsModalEvent } from './events';

export function UserSettingsButton() {
  return (
    <span
      className="gl-new-dropdown-item-content"
      onClick={() => document.dispatchEvent(ShowUserSettingsModalEvent)}
    >
      <span className="gl-new-dropdown-item-text-wrapper">
        <span style={{ color: '#e24329' }}>Gitlab Plus</span> settings
      </span>
    </span>
  );
}
