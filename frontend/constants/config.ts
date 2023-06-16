const fonts = ['Nunito:wght@400;600;700;800'];

export const FONTS_URL = `https://fonts.googleapis.com/css2?${fonts
  .map((font) => `family=${font}`)
  .join('&')}&display=swap`;

enum Config {
  DEFAULT_TITLE = 'Estagiar.io',
  DEFAULT_DESCRIPTION = 'Os melhores estágios estão aqui',
  FB_APP_ID = '',
  BASE_URL = 'https://estagiar.io',
  COVER_URL = 'https://estagiar.io/cover.png',
  SITE_NAME = 'Estagiar.io - Os melhores estágios estão aqui',
  AUTHOR = 'Estagiar.io',
  FB_VERIFY_CODE = '',
}
export const DEFAULT_KEYWORDS = [
  Config.BASE_URL.replace('https://', ''),
  Config.AUTHOR,
  'estagiar.io',
  'estagiar',
];

export default Config;