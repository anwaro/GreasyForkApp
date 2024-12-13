import { useEffect, useState } from 'preact/hooks';

import { clsx } from '@utils/clsx';

import { GitlabIcon } from './common/GitlabIcon';

type Props = {
  onClick: (element: HTMLElement) => string | undefined;
};

export function ImagePreviewModal({ onClick }: Props) {
  const [src, setSrc] = useState('');

  useEffect(() => {
    document.body.addEventListener('click', (ev) => {
      const _src = onClick(ev.target as HTMLElement);
      if (_src) {
        setSrc(_src);
        ev.preventDefault();
        ev.stopPropagation();
        return false;
      }
    });
  }, []);

  return (
    <div
      className={clsx(
        'glp-image-preview-modal',
        Boolean(src) && 'glp-modal-visible'
      )}
    >
      <img alt={'Image preview'} className={'glp-modal-img'} src={src} />
      <div onClick={() => setSrc('')} className={'glp-modal-close'}>
        <GitlabIcon icon={'close-xs'} size={24} />
      </div>
    </div>
  );
}
