import style1 from 'css:./create-related-issue.css';
import style2 from 'css:./image-preview.css';
import style3 from 'css:./issue-preview.css';
import { GlobalStyle } from '@ui/GlobalStyle';

GlobalStyle.addStyle('glp-style', [style1, style2, style3].join('\n'));
