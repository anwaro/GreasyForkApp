import { MrPreviewModal } from '../components/mr-preview/MrPreviewModal';
import { ServiceName } from '../consts/ServiceName';
import { RendererHelper } from '../helpers/RendererHelper';
import { BaseService } from './BaseService';

export class MrPreview extends BaseService {
  public name = ServiceName.MrPreview;

  public init() {
    RendererHelper.renderInBody('glp-mr-preview-root', <MrPreviewModal />);
  }
}
