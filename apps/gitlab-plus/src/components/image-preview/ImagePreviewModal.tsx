import { clsx } from '@utils/clsx';

import { GitlabIcon } from '../common/GitlabIcon';
import { useImagePreviewModal } from './useImagePreviewModal';

export function ImagePreviewModal() {
  const { onClose, onZoom, src, style } = useImagePreviewModal();

  return (
    <div
      className={clsx(
        'glp-image-preview-modal',
        Boolean(src) && 'glp-modal-visible'
      )}
    >
      <div
        className={
          'gl-flex gl-items-center gl-overflow-auto gl-h-full gl-w-full'
        }
      >
        <img alt={'Image preview'} onClick={onZoom} src={src} style={style} />
      </div>
      <div className={'glp-modal-close'} onClick={onClose}>
        <GitlabIcon icon={'close-xs'} size={24} />
      </div>
    </div>
  );
}
