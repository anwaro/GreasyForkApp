import { GlobalStyle } from '@ui/GlobalStyle';

import style2 from './glp-image-preview-modal.css?inline';
import style1 from './glp-modal.css?inline';
import style3 from './glp-preview-preview.css?inline';

GlobalStyle.addStyle('glp-style', [style1, style2, style3].join('\n'));
