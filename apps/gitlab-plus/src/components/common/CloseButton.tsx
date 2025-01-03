import { GitlabIcon } from './GitlabIcon';

type Props = {
  onClick: (e: Event) => void;
  title?: string;
};

export function CloseButton({ onClick, title = 'Close' }: Props) {
  return (
    <button
      class={
        'btn js-issue-item-remove-button gl-mr-2 btn-default btn-sm gl-button btn-default-tertiary btn-icon'
      }
      onClick={onClick}
      title={title}
    >
      <GitlabIcon icon={'close-xs'} size={16} />
    </button>
  );
}
