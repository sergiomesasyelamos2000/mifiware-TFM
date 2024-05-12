import { LANGUAGES_ENUM } from '@mifiware-tfm/entity-data-models';

const url = 'http://api:3000';

export const environment = {
  production: false,
  environment: 'DEV',
  enableCryptoStorage: false,
  publicAssetsUrl: `${url}`,
  apiUrl: `${url}/api/v1`,
  disableConsoleLog: false,
  sentry: {
    enable: false,
    dsn: '',
    attachStacktrace: false,
    tracesSampleRate: 0,
  },
  // Transloco config
  transloco: {
    defaultLang: LANGUAGES_ENUM.es,
    availableLangs: Object.keys(LANGUAGES_ENUM),
  },
};
