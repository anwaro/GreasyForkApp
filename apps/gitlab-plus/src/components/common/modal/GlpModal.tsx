import { ComponentChildren } from 'preact';

import { clsx } from '@utils/clsx';

import { CloseButton } from '../CloseButton';

type Props = {
  children: ComponentChildren;
  isVisible: boolean;
  onClose: () => void;
  title: ComponentChildren;
};

export function GlpModal({ children, isVisible, onClose, title }: Props) {
  return (
    <div class={clsx('glp-modal', isVisible && 'glp-modal-visible')}>
      <div
        className={clsx(
          'glp-modal-content crud gl-border',
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
            {title}
          </h2>
          <CloseButton onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
}
