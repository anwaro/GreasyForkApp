import { render } from 'preact';

import { ImagePreviewModal } from '../components/image-preview/ImagePreviewModal';
import { BaseService } from './BaseService';
import { ServiceName } from './ServiceName';

export class ImagePreview extends BaseService {
  public name = ServiceName.ImagePreview;

  public init() {
    render(<ImagePreviewModal />, this.rootBody('glp-image-preview-root'));
  }
}
