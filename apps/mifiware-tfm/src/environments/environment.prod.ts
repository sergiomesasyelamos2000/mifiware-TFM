import { LANGUAGES_ENUM } from '@mifiware-tfm/entity-data-models';

const url = 'http://localhost:3001';

export const environment = {
  production: true,
  environment: 'PROD',
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
