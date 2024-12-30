import { useEffect, useState } from 'preact/hooks';

import { clsx } from '@utils/clsx';

import { IssueLinkType } from '../../helpers/IssueLink';
import { CloseButton } from '../common/CloseButton';
import { CreateRelatedIssueModalContent } from './CreateRelatedIssueModalContent';
import { showModalEventName } from './event';

type Props = {
  link: IssueLinkType;
};

export function CreateRelatedIssueModal({ link }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.addEventListener(showModalEventName, () => setIsVisible(true));
  }, []);

  return (
    <div
      class={clsx(
        'glp-create-related-issue-layer',
        isVisible && 'glp-modal-visible'
      )}
    >
      <div
        className={clsx(
          'glp-create-related-issue-modal crud gl-border',
          'gl-rounded-form gl-border-section gl-bg-subtle gl-mt-5'
        )}
      >
        <div
          className={clsx(
            'crud-header gl-border-b gl-flex gl-flex-wrap',
            'gl-justify-between gl-gap-x-5 gl-gap-y-2 gl-rounded-t-form',
            'gl-border-section gl-bg-section gl-px-5 gl-py-4 gl-relative'
          )}
        >
          <h2
            className={clsx(
              'gl-m-0 gl-inline-flex gl-items-center gl-gap-3',
              'gl-text-form gl-font-bold gl-leading-normal'
            )}
          >
            Create related issue
          </h2>
          <CloseButton onClick={() => setIsVisible(false)} />
        </div>
        <CreateRelatedIssueModalContent
          onClose={() => setIsVisible(false)}
          isVisible={isVisible}
          link={link}
        />
      </div>
    </div>
  );
}
