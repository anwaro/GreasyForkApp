import styleDebug from 'css:./style/style-debug.css';
import style from 'css:./style/style.css';

import { GlobalStyle } from '@ui/GlobalStyle';
import { activateUrlChangeEvents } from '@utils/urlChangeEvent';

import { FacebookCleaner } from './services/FacebookCleaner';

activateUrlChangeEvents();

const isDebug = false;

GlobalStyle.addStyle('fcc-style', isDebug ? styleDebug : style);

const service = new FacebookCleaner();

service.run();
