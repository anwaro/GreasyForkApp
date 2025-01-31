import { PreviewPopup } from './components/PreviewPopup';
import { LinkHover } from './helpers/LinkHover';
import { AppleMusic } from './services/AppleMusic';
import { BaseService } from './services/BaseService';
import { Coub } from './services/Coub';
import { Dailymotion } from './services/Dailymotion';
import { Deezer } from './services/Deezer';
import { Facebook } from './services/Facebook';
import { Instagram } from './services/Instagram';
import { SoundCloud } from './services/SoundCloud';
import { Spotify } from './services/Spotify';
import { Streamable } from './services/Streamable';
import { Tableau } from './services/Tableau';
import { Tidal } from './services/Tidal';
import { Tiktok } from './services/Tiktok';
import { Twitter } from './services/Twitter';
import { Vimeo } from './services/Vimeo';
import { Youtube } from './services/Youtube';
// import { Odysee } from './services/Odysee';
// import { Rumble } from './services/Rumble';

function run() {
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
}

if (window.top == window.self) {
  run();
}
