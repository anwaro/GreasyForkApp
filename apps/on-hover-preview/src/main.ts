import { PreviewPopup } from './components/PreviewPopup';
import { LinkHover } from './helpers/LinkHover';
import { AmazonMusic } from './services/AmazonMusic';
import { AppleMusic } from './services/AppleMusic';
import { BaseService } from './services/base/BaseService';
import { Bitchute } from './services/Bitchute';
import { Coub } from './services/Coub';
import { Dailymotion } from './services/Dailymotion';
import { Deezer } from './services/Deezer';
import { Facebook } from './services/Facebook';
import { Instagram } from './services/Instagram';
import { Odysee } from './services/Odysee';
import { Pbs } from './services/Pbs';
import { Playeur } from './services/Playeur';
import { Podbean } from './services/Podbean';
import { Rss } from './services/Rss';
import { SoundCloud } from './services/SoundCloud';
import { Spotify } from './services/Spotify';
import { Streamable } from './services/Streamable';
import { Ted } from './services/Ted';
import { Tidal } from './services/Tidal';
import { Tiktok } from './services/Tiktok';
import { Twitter } from './services/Twitter';
import { Vimeo } from './services/Vimeo';
import { Youtube, YoutubeShortcut, YoutubeShorts } from './services/Youtube';

function run() {
  const services: BaseService[] = [
    Youtube,
    YoutubeShortcut,
    YoutubeShorts,
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
    SoundCloud,
    AppleMusic,
    Deezer,
    Tidal,
    Ted,
    Pbs,
    Odysee,
    Playeur,
    Bitchute,
    Podbean,
    Rss,
    AmazonMusic,
    // Rumble,
  ].map((Service) => new Service());

  const previewPopup = new PreviewPopup();

  new LinkHover(services, previewPopup.showPopup.bind(previewPopup));
}

if (window.top == window.self) {
  run();
}
