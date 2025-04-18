import { ImagePreviewModal } from '../components/image-preview/ImagePreviewModal';
import { ServiceName } from '../consts/ServiceName';
import { RendererHelper } from '../helpers/RendererHelper';
import { BaseService } from './BaseService';

export class ImagePreview extends BaseService {
  public name = ServiceName.ImagePreview;

  public init() {
    RendererHelper.renderInBody(
      'glp-image-preview-root',
      <ImagePreviewModal />
    );
  }
}
