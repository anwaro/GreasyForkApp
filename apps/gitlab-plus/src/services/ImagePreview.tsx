import { render } from 'preact';

import { ImagePreviewModal } from '../components/image-preview/ImagePreviewModal';
import { ServiceName } from '../consts/ServiceName';
import { BaseService } from './BaseService';

export class ImagePreview extends BaseService {
  public name = ServiceName.ImagePreview;

  public init() {
    render(<ImagePreviewModal />, this.rootBody('glp-image-preview-root'));
  }
}
