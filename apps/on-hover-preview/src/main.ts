import { PreviewPopup } from './components/PreviewPopup';
import { Streamable } from './services/Streamable';
import { BaseService } from './services/BaseService';
import { Vimeo } from './services/Vimeo';
import { Youtube } from './services/Youtube';
import { Facebook } from './services/Facebook';
import { Tiktok } from './services/Tiktok';
import { Instagram } from './services/Instagram';
import { Twitter } from './services/Twitter';
import { LinkHover } from './helpers/LinkHover';
import { Dailymotion } from './services/Dailymotion';
import { Coub } from './services/Coub';
import { Spotify } from './services/Spotify';
import { Tableau } from './services/Tableau';
import { SoundCloud } from './services/SoundCloud';
import { AppleMusic } from './services/AppleMusic';
import { Deezer } from './services/Deezer';
import { Tidal } from './services/Tidal';
// import { Odysee } from './services/Odysee';
// import { Rumble } from './services/Rumble';

const services: BaseService[] = [
  Youtube,
  Vimeo,
  Streamable,
  Facebook,
  Tiktok,
  Instagram,
  Twitter,
  Dailymotion,
  Dailymotion,
  Coub,
  Spotify,
  Tableau,
  SoundCloud,
  AppleMusic,
  Deezer,
  Tidal,
  // Odysee,
  // Rumble,
].map((Service) => new Service());

const previewPopup = new PreviewPopup();

new LinkHover(services, previewPopup.showPopup.bind(previewPopup));
