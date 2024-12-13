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
        onClick={create}
        class={'btn btn-confirm btn-sm gl-button gl-gap-2'}
        disabled={isLoading}
        type={'button'}
      >
        <span class={'gl-button-text'}>Add</span>
        {isLoading ? (
          <GitlabLoader size={12} />
        ) : (
          <GitlabIcon icon={'plus'} size={12} />
        )}
      </button>
      <button onClick={reset} class={'btn btn-sm gl-button'} type={'button'}>
        <span class={'gl-button-text'}>Reset</span>
      </button>
    </>
  );
}
