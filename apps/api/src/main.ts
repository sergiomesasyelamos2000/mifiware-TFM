/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as swStats from 'swagger-stats';
import { environment } from './environments/environment';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import * as morgan from 'morgan';
import * as rfs from 'rotating-file-stream';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'body-parser';
import { readFileSync } from 'fs';

// Implicit requires to force adding these necesary libraries to the distribution package.json
require('mysql2');
require('swagger-ui-express');
require('pm2');
require('prom-client');
require('reflect-metadata');
require('rxjs');

/**
 * Generates a middleware with Basic HTTP AUTH (used for authenticate the swagger endpoint),
 * @param u username
 * @param p password
 * @param realm access group
 * @param url URL to intercept
 */
function basicAuthMiddleware(u: string, p: string, realm: string, url: string) {
  return (req, res, next) => {
    if (req.originalUrl && req.originalUrl.includes(url)) {
      const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
      const [login, password] = Buffer.from(b64auth, 'base64')
        .toString()
        .split(':');
      if (login && password && login === u && password === p) {
        return next();
      }
      res.set('WWW-Authenticate', `Basic realm="${realm}"`);
      res.status(401).send('Authentication required');
    } else {
      return next();
    }
  };
}

/**
 * Configure Swagger
 */
function initSwagger(app: INestApplication) {
  const swaggerUrl = `/${environment.httpConfig.globalPrefix}/${environment.httpConfig.apiVersion}/${environment.swaggerConfig.endpoint}`;
  const swaggerStatsUrl = `/${environment.httpConfig.globalPrefix}/${environment.httpConfig.apiVersion}/${environment.swaggerConfig.swaggerStatsUrl}`;
  app.use(
    swaggerUrl,
    basicAuthMiddleware(
      environment.swaggerConfig.auth.user,
      environment.swaggerConfig.auth.pass,
      'SwaggerArea',
      swaggerUrl
    )
  );
  app.use(
    swaggerStatsUrl,
    basicAuthMiddleware(
      environment.swaggerConfig.auth.user,
      environment.swaggerConfig.auth.pass,
      'SwaggerArea',
      swaggerStatsUrl
    )
  );
  const options = new DocumentBuilder()
    .setTitle(
      `${environment.swaggerConfig.title} (v1) [${environment.environment}]`
    )
    .setDescription(environment.swaggerConfig.description)
    .setVersion('1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(
    swaggerUrl,
    app,
    document,
    environment.swaggerConfig.options
  );
  console.log(`Swagger UI available at ${swaggerUrl}`);

  // TODO: Revisar el PM2. A ver como gestiona las requests con el cluster
  app.use(
    swStats.getMiddleware({
      swaggerSpec: document,
      name: 'tfm-api',
      version: '1',
      uriPath: swaggerStatsUrl,
    })
  );
}

/**
 * Info logs on server launch
 */
function logServerLaunch() {
  console.log(`\n`);
  console.log(
    `SUCCESS! mifiware [${environment.environment} environment] (v1)`
  );
  console.log(
    ` - Server listening on: ${
      environment.httpConfig.httpsEnabled ? 'https' : 'http'
    }://${environment.httpConfig.publicDomain}${
      environment.httpConfig.publicPort
        ? ':' + environment.httpConfig.publicPort
        : ''
    }`
  );
  console.log(
    ` - Swagger docs available on: ${
      environment.httpConfig.httpsEnabled ? 'https' : 'http'
    }://${environment.httpConfig.publicDomain}${
      environment.httpConfig.publicPort
        ? ':' + environment.httpConfig.publicPort
        : ''
    }/${environment.httpConfig.globalPrefix}/${
      environment.httpConfig.apiVersion
    }/${environment.swaggerConfig.endpoint}`
  );
  console.log(
    ` - Metrics dashboard available on: ${
      environment.httpConfig.httpsEnabled ? 'https' : 'http'
    }://${environment.httpConfig.publicDomain}${
      environment.httpConfig.publicPort
        ? ':' + environment.httpConfig.publicPort
        : ''
    }/${environment.httpConfig.globalPrefix}/${
      environment.httpConfig.apiVersion
    }/${environment.swaggerConfig.swaggerStatsUrl}`
  );
  console.log(` - Server started at: ${new Date()}`);
  console.log('\n');
}

/**
 * Logger. Create a rotating write stream for requests
 */
function initLogger(app: INestApplication) {
  const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: join(__dirname, 'logs'),
    maxFiles: 30, // 1 month
  });
  app.use(morgan('common', { stream: accessLogStream }));
}

export async function bootstrap(app?: NestExpressApplication) {
  // Create NestJS app
  if (environment.environment !== 'TEST') {
    const httpsOptions = {
      key: readFileSync('/etc/ssl/private/privkey.pem'),
      cert: readFileSync('/etc/ssl/certs/fullchain.pem'),
    };

    app = await NestFactory.create<NestExpressApplication>(AppModule, {
      cors: environment.secure.enableCors,
      httpsOptions,
    });
    /* app = await NestFactory.create<NestExpressApplication>(AppModule, {
      cors: environment.secure.enableCors, // { origin: ['http://localhost:4601'], methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', credentials: true },
    }); */

    // Agrega más opciones de CORS si lo deseas
    app.enableCors({
      origin: environment.secure.enableCors.origin,
      methods: environment.secure.enableCors.methods,
      allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
      credentials: true,
    });
  }
  // Add a global prefix to the API
  app.setGlobalPrefix(
    `${environment.httpConfig.globalPrefix}/${environment.httpConfig.apiVersion}`
  );

  // Configure security middlewares
  app.use(compression());
  app.use(helmet({ contentSecurityPolicy: false }));
  //app.use(rateLimit(environment.secure.rateLimitConfig));
  app.use(json({ limit: environment.secure.payloadSizeLimit }));

  // Add API Interceptors
  //app.useGlobalInterceptors(new TimeoutInterceptor());
  //app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));
  if (environment.environment === 'DEV' || environment.environment === 'PRE') {
    //app.useGlobalInterceptors(new ConsoleLogResponsesInterceptor());
  }

  if (environment.environment !== 'TEST') {
    // Init Swagger
    initSwagger(app);
    // Init Logger
    initLogger(app);
  }

  if (environment.environment !== 'TEST') {
    // Start NestJS server
    await app.listen(
      environment.httpConfig.privatePort,
      environment.httpConfig.privateDomain,
      () => {
        logServerLaunch();
        // Here we send the ready signal to PM2 (https://pm2.keymetrics.io/docs/usage/signals-clean-restart/#graceful-start)
        process.send('ready');
      }
    );
  }
}

if (environment.environment !== 'TEST') {
  bootstrap();
}
