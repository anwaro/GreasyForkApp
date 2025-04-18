import { EpicPreviewModal } from '../components/epic-preview/EpicPreviewModal';
import { ServiceName } from '../consts/ServiceName';
import { RendererHelper } from '../helpers/RendererHelper';
import { BaseService } from './BaseService';

export class EpicPreview extends BaseService {
  public name = ServiceName.EpicPreview;

  public init() {
    RendererHelper.renderInBody('glp-epic-preview-root', <EpicPreviewModal />);
  }
}
