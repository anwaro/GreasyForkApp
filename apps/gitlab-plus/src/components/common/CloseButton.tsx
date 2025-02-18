import { GitlabButton } from './GitlabButton';

type Props = {
  onClick: (e: Event) => void;
  title?: string;
};

export function CloseButton({ onClick, title = 'Close' }: Props) {
  return (
    <GitlabButton
      className={'btn-icon'}
      icon={'close-xs'}
      iconSize={16}
      onClick={onClick}
      title={title}
      variant={'tertiary'}
    />
  );
}
