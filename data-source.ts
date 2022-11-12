import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  synchronize: process.env.DATABASE_SYNC === 'true',
  logging: true,
  seeds: [__dirname + '/src/database/seeds/**/*{.ts,.js}'],
  factories: [__dirname + '/src/database/factories/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(options);
