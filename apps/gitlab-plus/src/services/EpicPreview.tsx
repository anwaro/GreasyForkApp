import { render } from 'preact';

import { EpicPreviewModal } from '../components/epic-preview/EpicPreviewModal';
import { ServiceName } from '../consts/ServiceName';
import { BaseService } from './BaseService';

export class EpicPreview extends BaseService {
  public name = ServiceName.EpicPreview;

  public init() {
    render(<EpicPreviewModal />, this.rootBody('glp-epic-preview-root'));
  }
}
