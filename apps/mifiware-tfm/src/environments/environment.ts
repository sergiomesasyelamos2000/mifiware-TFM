
const url = 'http://localhost:3000';

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
};
