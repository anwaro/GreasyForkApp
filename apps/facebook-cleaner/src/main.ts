import { FacebookCleaner } from './services/FacebookCleaner';
import { activateUrlChangeEvents } from '@utils/urlChangeEvent';
import { GlobalStyle } from '@ui/GlobalStyle';

import style from 'css:./style/style.css';
import styleDebug from 'css:./style/style-debug.css';

activateUrlChangeEvents();

const isDebug = false;

GlobalStyle.addStyle('fcc-style', isDebug ? styleDebug : style);

const service = new FacebookCleaner();

service.run();
