import { ShowModalEvent } from './event';

export function CreateIssueButton() {
  const onClick = () => {
    document.dispatchEvent(ShowModalEvent);
  };

  return (
    <button
      onClick={onClick}
      class={'btn btn-default btn-sm gl-button'}
      type={'button'}
    >
      <span class={'gl-button-text'}>Create related issue</span>
    </button>
  );
}
