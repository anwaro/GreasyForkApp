export type LocaleDictionary = {
  hiddenPost: string;
  feed: string;
  follow: string;
  join: string;
  reels: string;
  sponsored: string;
};

export type Lang =
  | 'cs'
  | 'de'
  | 'en'
  | 'es'
  | 'fr'
  | 'id'
  | 'it'
  | 'pl'
  | 'pt'
  | 'sk'
  | 'sl'
  | 'szl'
  | 'tr'
  | 'uk'
  | 'zh-Hans'
  | 'zh-Hant';

export const locales: Record<Lang, LocaleDictionary> = {
  id: {
    hiddenPost: 'Postingan tersembunyi',
    feed: 'Postingan Kabar Beranda',
    follow: 'Ikuti',
    join: 'Gabung',
    reels: 'Reels',
    sponsored: 'Bersponsor',
  },
  cs: {
    hiddenPost: 'Skryté příspěvky',
    feed: 'Příspěvku v kanálu vybraných příspěvků',
    follow: 'Sledovat',
    join: 'Přidat se',
    reels: 'Reels',
    sponsored: 'Sponzorováno',
  },
  de: {
    hiddenPost: 'Versteckte Beiträge',
    feed: 'News Feed-Beiträge',
    follow: 'Folgen',
    join: 'Beitreten',
    reels: 'Reels',
    sponsored: 'Anzeige',
  },
  en: {
    hiddenPost: 'Hidden posts',
    feed: 'News Feed posts',
    follow: 'Follow',
    join: 'Join',
    reels: 'Reels',
    sponsored: 'Sponsored',
  },
  es: {
    hiddenPost: 'Publicaciones ocultas',
    feed: 'Publicaciones de la sección de noticias',
    follow: 'Seguir',
    join: 'Unirte',
    reels: 'Reels',
    sponsored: 'Publicidad',
  },
  fr: {
    hiddenPost: 'Messages masqués',
    feed: 'Nouvelles publications du fil d’actualité',
    follow: 'Suivre',
    join: 'Rejoindre',
    reels: 'Reels',
    sponsored: 'Sponsorisé',
  },
  it: {
    hiddenPost: 'Post nascosti',
    feed: 'Post della sezione Notizie',
    follow: 'Segui',
    join: 'Iscriviti',
    reels: 'Reels',
    sponsored: 'Sponsorizzato',
  },
  pl: {
    hiddenPost: 'Ukryte posty',
    feed: 'Posty w Aktualnościach',
    follow: 'Obserwuj',
    join: 'Dołącz',
    reels: 'Rolki',
    sponsored: 'Sponsorowane',
  },
  pt: {
    hiddenPost: 'Postagens ocultas',
    feed: 'Publicações do Feed de Notícias',
    follow: 'Seguir',
    join: 'Participar',
    reels: 'Reels',
    sponsored: 'Patrocinado',
  },
  sk: {
    hiddenPost: 'Skryté príspevky',
    feed: 'Príspevky v Novinkách',
    follow: 'Sledovať',
    join: 'Pridať sa',
    reels: 'Reels',
    sponsored: 'Sponzorované',
  },
  sl: {
    hiddenPost: 'Skrite objave',
    feed: 'Objave v viru novic',
    follow: 'Sledi',
    join: 'Pridruži se',
    reels: 'Interaktivni videi',
    sponsored: 'Sponzorirano',
  },
  szl: {
    hiddenPost: 'Skryte posty',
    feed: 'Posty w Aktualnościach',
    follow: 'Obserwuj',
    join: 'Dołącz',
    reels: 'Rolki',
    sponsored: 'Szpōnzorowane',
  },
  tr: {
    hiddenPost: 'Gizli gönderiler',
    feed: 'Haber Kaynağı gönderileri',
    follow: 'Takip Et',
    join: 'Katıl',
    reels: 'Reels',
    sponsored: 'Sponsorlu',
  },
  uk: {
    hiddenPost: 'Приховані пости/Prykhovani posty',
    feed: 'Дописи зі стрічки новин',
    follow: 'Стежити',
    join: 'Приєднатися',
    reels: 'Відео Reels',
    sponsored: 'Реклама',
  },
  'zh-Hans': {
    hiddenPost: '隐藏帖子',
    feed: '动态消息帖子',
    follow: '关注',
    join: '加入',
    reels: 'Reels',
    sponsored: '赞助内容',
  },
  'zh-Hant': {
    hiddenPost: '隱藏貼文',
    feed: '動態消息帖子',
    follow: '追蹤',
    join: '加入',
    reels: 'Reels',
    sponsored: '贊助',
  },
};

export const languages = Object.keys(locales) as Lang[];
