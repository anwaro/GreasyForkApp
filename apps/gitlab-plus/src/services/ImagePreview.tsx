import { render } from 'preact';

import { ImagePreviewModal } from '../components/image-preview/ImagePreviewModal';
import { Service } from '../types/Service';

export class ImagePreview extends Service {
  public init() {
    render(<ImagePreviewModal />, this.rootBody('glp-image-preview-root'));
  }
}
