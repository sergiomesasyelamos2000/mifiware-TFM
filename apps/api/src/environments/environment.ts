export const environment = {
  production: false,
  environment: 'DEV',
  httpConfig: {
    privateDomain: '0.0.0.0',
    privatePort: 3001,
    publicDomain: 'localhost',
    publicPort: 3001,
    httpsEnabled: false,
    globalPrefix: 'api',
    apiVersion: 'v1',
    publicAssetsUrl: '',
    publicApiUrl: '',
  },
  typeormConfig: {
    softDelete: true,
    logging: ['error', 'warn'],
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    //host: '127.0.0.1',
    // port: 3306,
    // username: 'root',
    // password: 'root',
    // database: 'tfm',
    synchronize: true,
    charset: 'utf8mb4',
  },
  photoBase64: {
    dirname: 'cdn/images/avatar.png',
  },
  // Swagger Config
  swaggerConfig: {
    auth: {
      user: 'mifiware',
      pass: 'mifiware',
    },
    title: 'MIFIWARE Api',
    description: 'Swagger API documentation',
    endpoint: 'docs',
    options: {
      swaggerOptions: {
        docExpansion: 'list',
        filter: true,
        showRequestDuration: true,
        displayRequestDuration: true,
        persistAuthorization: true,
      },
    },
    swaggerStatsUrl: 'swagger-stats',
  },
  auth: {
    validateUserEmails: false,
    tokenType: 'Bearer',
    accessToken: {
      secretKey:
        'Odcu/xJvjcDc/0ZZwXz24VCpDF3YJNVYzXwx88gI1xDO2i1eFlFGRhHlOLww2NfmUpNdaWnytIKwrJ4CUZ2SONcqDgF9dI8NfXMPTyuxC/q4fyuBUlKkZF8uO5Ujh392+znJXmgYyjU/rSA+L6PaLy67c+H5KvBjNG1No2KQ3d95YutkdK46+Y7WyOKN8AlKYcVhzQQjQ9yak7WEdx1R0zf7YflW8tzgIaNrlXztdoctZsGTCzkCeLc3yBWOPLobVElOYfFhSVFVFEoQGGCQZTfIfyMUtxo1+6J3EmJa2/tc29UFOBsvrI33X104We5VzJiOpnD0SgOrn8IErOjzbA==',
      expiresIn: 1 * 24 * 60 * 60, // 1 day
    },
    refreshToken: {
      secretKey:
        'fa4b83i45NQZCzA4EK2u6DI6Qiri5GviFRekkD03LuWZYLLXPHpn7e6wectPjHGnAeu7HPVXklhRBRMbGWIs2t5Z2u03E5dW+opM2dTPfNfN3NIUvjBOIFqrnm5/ZAFiNRrzM4MvuXBCPFrBWfm4rzdePdc+pRUJGaTQTkP0l9LkoDHDEaav2Vu0HkyVVqE5wXOiAewm5a5fyZY7Fh7tduNXKAwurqUiSFr9cic/3V2pt2oMK02VdEnCobq688HZwaGZt3ypZuU/Z2TDbeQof76Vu64anAtu2nhFSBNg2jhveY+XTAejDnv4EFhkKcwbgNv1//UJX5RUCBpmxMFmHw==',
      expiresIn: 30 * 24 * 60 * 60, // 30 days
    },
    validateToken: {
      secretKey:
        'TePCGkYqqgy7KwzB6dm9YWflF2G0a/H7X74JDFkBWLNitmAAewTbDhxJCLZbfq/TsTOYcQZANnq2Af0KXH1iJ9ljxro7ograWorK4J+MJ3CS/mJrgKskG/iZyLCTzhsTpGD+gbio0SvR4XgrROpzdLFSS1+kNx27jrwh9rJ4iFzOIXvNp79t8UmO2QrgD9Tufz0Uv9qHMoTTQJl3nDQM023Zo3Dk0eSFglkQgQCrZd8gXip+nObJ7tBWW3mX0mS8sN1gpv3S/R6JQPKgELKmqfRioOQINmSjnbivyxfvWWZn52gWnyexmBTD7Gneqj0g2iwAtuyLHe1tFDfYq68T0w==',
      expiresIn: 1 * 24 * 60 * 60, // 1 days
    },
    resetPassToken: {
      secretKey:
        '+qvc736v2u+phCx+foDUKpxma67akCN3hLZ2TFRJEkl5KP9PYm4gW7ZOZIWi0heAQZp45e7VzHF3YhaQZiZajWUW+0ppL2ykzgDAci8VtG8w/6z7VJ4hcyfbQdAuwODYnMmlF+UmJbC3vvG50rwGOl/u7APM9byetp+bhy00i5ivQ9RRZ/hZMwo/2nhYVuTaYKvkOfQdenKvd/vUB/DlsllSqPAJ1v2kE4eTOczc4MLdlh2s/pZYU/+t8e/UuLZy/FfP+sFgc+rnuiBfNzl76GseuBKHNpiZF75Qm2nhMiiUmTuugXDeph1KTlAX8eI/WYqefDs6JVHN+b0IlrZ6nQ==',
      expiresIn: 1 * 24 * 60 * 60, // 1 days
    },
  },
  // Security config
  secure: {
    superAdminUser: {
      email: 'root@root.com',
      pass: 'root',
    },
    comertialUser: {
      email: 'comertial@comertial.com',
      pass: 'comertial',
    },
    validationPipeConfig: {
      transform: true,
      disableErrorMessages: false,
      whitelist: true,
      validationError: { target: false },
    },
    timeoutMs: 1000000,
    rateLimitConfig: {
      windowMs: 5 * 60 * 1000, // 5 minutes
      max: 500, // limit each IP to 500 requests per windowMs
    },
    enableCors: {
      origin: ['http://localhost:4601'], // Reemplaza para AWS con nginx origin: ['http://localhost']
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
    payloadSizeLimit: '10mb', // 10MB
  },
  secretKey: 'secretKey',
};

export default environment;
