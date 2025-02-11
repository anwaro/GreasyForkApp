import { render } from 'preact';

import { EpicPreviewModal } from '../components/epic-preview/EpicPreviewModal';
import { Service } from '../types/Service';

export class EpicPreview extends Service {
  public init() {
    render(<EpicPreviewModal />, this.rootBody('glp-epic-preview-root'));
  }
}
