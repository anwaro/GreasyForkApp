import { GlobalStyle } from '@ui/GlobalStyle';

import style1 from './create-related-issue.css?inline';
import style2 from './image-preview.css?inline';
import style3 from './item-preview.css?inline';

GlobalStyle.addStyle('glp-style', [style1, style2, style3].join('\n'));
