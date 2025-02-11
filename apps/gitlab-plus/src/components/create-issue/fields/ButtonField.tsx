import { GitlabIcon } from '../../common/GitlabIcon';
import { GitlabLoader } from '../../common/GitlabLoader';

type Props = {
  create: () => void;
  isLoading: boolean;
  reset: () => void;
};

export function ButtonField({ create, isLoading, reset }: Props) {
  return (
    <>
      <button
        class={'btn btn-confirm btn-sm gl-button gl-gap-2'}
        disabled={isLoading}
        onClick={create}
        type={'button'}
      >
        <span class={'gl-button-text'}>Add</span>
        {isLoading ? (
          <GitlabLoader size={12} />
        ) : (
          <GitlabIcon icon={'plus'} size={12} />
        )}
      </button>
      <button class={'btn btn-sm gl-button'} onClick={reset} type={'button'}>
        <span class={'gl-button-text'}>Reset</span>
      </button>
    </>
  );
}
