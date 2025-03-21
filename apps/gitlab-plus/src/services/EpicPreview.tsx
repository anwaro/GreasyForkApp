import { render } from 'preact';

import { EpicPreviewModal } from '../components/epic-preview/EpicPreviewModal';
import { BaseService } from './BaseService';
import { ServiceName } from './ServiceName';

export class EpicPreview extends BaseService {
  public name = ServiceName.EpicPreview;

  public init() {
    render(<EpicPreviewModal />, this.rootBody('glp-epic-preview-root'));
  }
}
