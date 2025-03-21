import { render } from 'preact';

import { MrPreviewModal } from '../components/mr-preview/MrPreviewModal';
import { BaseService } from './BaseService';
import { ServiceName } from './ServiceName';

export class MrPreview extends BaseService {
  public name = ServiceName.MrPreview;

  public init() {
    render(<MrPreviewModal />, this.rootBody('glp-mr-preview-root'));
  }
}
