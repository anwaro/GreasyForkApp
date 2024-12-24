export type LocaleDictionary = {
  follow: string;
  join: string;
  feed: string;
  reels: string;
  sponsored: string;
  hiddenPost: string;
};

export type Lang =
  | 'pl'
  | 'en'
  | 'es'
  | 'pt'
  | 'de'
  | 'cs'
  | 'sl'
  | 'sk'
  | 'fr'
  | 'tr'
  | 'szl'
  | 'it'
  | 'uk'
  | 'zh-Hans'
  | 'zh-Hant'
  | 'id';

export const locales: Record<Lang, LocaleDictionary> = {
  en: {
    follow: 'Follow',
    join: 'Join',
    feed: 'News Feed posts',
    reels: 'Reels',
    sponsored: 'Sponsored',
    hiddenPost: 'Hidden posts',
  },
  es: {
    follow: 'Seguir',
    join: 'Unirte',
    feed: 'Publicaciones de la sección de noticias',
    reels: 'Reels',
    sponsored: 'Publicidad',
    hiddenPost: 'Publicaciones ocultas',
  },
  pt: {
    follow: 'Seguir',
    join: 'Participar',
    feed: 'Publicações do Feed de Notícias',
    reels: 'Reels',
    sponsored: 'Patrocinado',
    hiddenPost: 'Postagens ocultas',
  },
  pl: {
    follow: 'Obserwuj',
    join: 'Dołącz',
    feed: 'Posty w Aktualnościach',
    reels: 'Rolki',
    sponsored: 'Sponsorowane',
    hiddenPost: 'Ukryte posty',
  },
  de: {
    follow: 'Folgen',
    join: 'Beitreten',
    feed: 'News Feed-Beiträge',
    reels: 'Reels',
    sponsored: 'Anzeige',
    hiddenPost: 'Versteckte Beiträge',
  },
  cs: {
    follow: 'Sledovat',
    join: 'Přidat se',
    feed: 'Příspěvku v kanálu vybraných příspěvků',
    reels: 'Reels',
    sponsored: 'Sponzorováno',
    hiddenPost: 'Skryté příspěvky',
  },
  sk: {
    follow: 'Sledovať',
    join: 'Pridať sa',
    feed: 'Príspevky v Novinkách',
    reels: 'Reels',
    sponsored: 'Sponzorované',
    hiddenPost: 'Skryté príspevky',
  },
  sl: {
    follow: 'Sledi',
    join: 'Pridruži se',
    feed: 'Objave v viru novic',
    reels: 'Interaktivni videi',
    sponsored: 'Sponzorirano',
    hiddenPost: 'Skrite objave',
  },
  fr: {
    follow: 'Suivre',
    join: 'Rejoindre',
    feed: 'Nouvelles publications du fil d’actualité',
    reels: 'Reels',
    sponsored: 'Sponsorisé',
    hiddenPost: 'Messages masqués',
  },
  tr: {
    follow: 'Takip Et',
    join: 'Katıl',
    feed: 'Haber Kaynağı gönderileri',
    reels: 'Reels',
    sponsored: 'Sponsorlu',
    hiddenPost: 'Gizli gönderiler',
  },
  id: {
    follow: 'Ikuti',
    join: 'Gabung',
    feed: 'Postingan Kabar Beranda',
    reels: 'Reels',
    sponsored: 'Bersponsor',
    hiddenPost: 'Postingan tersembunyi',
  },
  it: {
    follow: 'Segui',
    join: 'Iscriviti',
    feed: 'Post della sezione Notizie',
    reels: 'Reels',
    sponsored: 'Sponsorizzato',
    hiddenPost: 'Post nascosti',
  },
  'zh-Hans': {
    follow: '关注',
    join: '加入',
    feed: '动态消息帖子',
    reels: 'Reels',
    sponsored: '赞助内容',
    hiddenPost: '隐藏帖子',
  },
  'zh-Hant': {
    follow: '追蹤',
    join: '加入',
    feed: '動態消息帖子',
    reels: 'Reels',
    sponsored: '贊助',
    hiddenPost: '隱藏貼文',
  },
  szl: {
    follow: 'Obserwuj',
    join: 'Dołącz',
    feed: 'Posty w Aktualnościach',
    reels: 'Rolki',
    sponsored: 'Szpōnzorowane',
    hiddenPost: 'Skryte posty',
  },
  uk: {
    follow: 'Стежити',
    join: 'Приєднатися',
    feed: 'Дописи зі стрічки новин',
    reels: 'Відео Reels',
    sponsored: 'Реклама',
    hiddenPost: 'Приховані пости/Prykhovani posty',
  },
};

export const languages = Object.keys(locales) as Lang[];
