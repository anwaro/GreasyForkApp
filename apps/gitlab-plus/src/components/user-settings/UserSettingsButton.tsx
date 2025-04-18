import { ModalEvents } from '../common/modal/events';

export function UserSettingsButton() {
  return (
    <span
      className="gl-new-dropdown-item-content"
      onClick={() =>
        document.dispatchEvent(
          new CustomEvent(ModalEvents.showUserSettingsModal)
        )
      }
    >
      <span className="gl-new-dropdown-item-text-wrapper">
        <span style={{ color: '#e24329' }}>Gitlab Plus</span> settings
      </span>
    </span>
  );
}
