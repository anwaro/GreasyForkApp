import { render } from 'preact';

import { MrPreviewModal } from '../components/mr-preview/MrPreviewModal';
import { ServiceName } from '../consts/ServiceName';
import { BaseService } from './BaseService';

export class MrPreview extends BaseService {
  public name = ServiceName.MrPreview;

  public init() {
    render(<MrPreviewModal />, this.rootBody('glp-mr-preview-root'));
  }
}
