import { render } from 'preact';

import { MrPreviewModal } from '../components/mr-preview/MrPreviewModal';
import { Service } from '../types/Service';

export class MrPreview extends Service {
  public init() {
    render(<MrPreviewModal />, this.rootBody('glp-mr-preview-root'));
  }
}
