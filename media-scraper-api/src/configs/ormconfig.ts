import { ConnectionOptions } from 'typeorm';

export default {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: !process.env.isProd,
  logging: !process.env.isProd,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migration/**/*.{js,ts}'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: './migration',
    subscribersDir: 'src/subscriber',
  },
} as ConnectionOptions;
