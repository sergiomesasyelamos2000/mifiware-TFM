export const environment = {
  production: true,
  // Cambiar la configuración de typeormConfig para que apunte a la base de datos de producción
  typeormConfig: {
    softDelete: true,
    logging: ['error', 'warn'],
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'tfm',
    synchronize: true,
    charset: 'utf8mb4'
  },
  secretKey: 'secretKey'
};
