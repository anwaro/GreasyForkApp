import { clsx } from '@utils/clsx';

import { GitlabIcon } from '../common/GitlabIcon';
import { useImagePreviewModal } from './useImagePreviewModal';

export function ImagePreviewModal() {
  const { onClose, src } = useImagePreviewModal();

  return (
    <div
      className={clsx(
        'glp-image-preview-modal',
        Boolean(src) && 'glp-modal-visible'
      )}
    >
      <img alt={'Image preview'} className={'glp-modal-img'} src={src} />
      <div onClick={onClose} className={'glp-modal-close'}>
        <GitlabIcon icon={'close-xs'} size={24} />
      </div>
    </div>
  );
}
